import os, re, sys

ROOT = r"d:\My Web Sites\aaradhya 2"

# ---- robots.txt ----
rpath = os.path.join(ROOT, "robots.txt")
print("=== ROBOTS.TXT ===")
if os.path.exists(rpath):
    print(open(rpath).read())
else:
    print("MISSING!")

# ---- sitemap.xml ----
spath = os.path.join(ROOT, "sitemap.xml")
print("\n=== SITEMAP.XML ===")
if os.path.exists(spath):
    xml = open(spath, encoding="utf-8").read()
    locs = re.findall(r"<loc>(.*?)</loc>", xml)
    mods = re.findall(r"<lastmod>(.*?)</lastmod>", xml)
    print(str(len(locs)) + " URLs in sitemap")
    for i in range(min(5, len(locs))):
        mod = mods[i] if i < len(mods) else "n/a"
        print("  " + locs[i] + "  | lastmod: " + mod)
    print("  ...")
else:
    print("MISSING!")

# ---- image sizes ----
print("\n=== TOP 15 HEAVIEST IMAGES ===")
assets = os.path.join(ROOT, "assets")
imgs = []
for root, dirs, files in os.walk(assets):
    for f in files:
        if any(f.lower().endswith(e) for e in [".jpg", ".jpeg", ".png", ".webp", ".gif"]):
            fp = os.path.join(root, f)
            try:
                sz = os.path.getsize(fp)
                imgs.append((sz, os.path.relpath(fp, ROOT), f))
            except:
                pass
imgs.sort(reverse=True)
for sz, rel, name in imgs[:15]:
    flag = "  OVERSIZED!" if sz > 300000 else ""
    print("  " + str(sz // 1024).rjust(6) + " KB  " + rel + flag)

# ---- keywords ----
print("\n=== META KEYWORDS (MAIN PAGES) ===")
pages = ["index.html", "about.html", "contact.html", "services.html", "products.html", "gallery.html"]
for p in pages:
    fp = os.path.join(ROOT, p)
    html = open(fp, encoding="utf-8", errors="ignore").read()
    kw = re.search('name="keywords" content="([^"]+)"', html)
    if kw:
        val = kw.group(1)
        print(p + ": " + val[:150])
    else:
        print(p + ": MISSING")

# ---- headings per page ----
print("\n=== H1 / H2 HEADINGS (MAIN PAGES) ===")
for p in pages:
    fp = os.path.join(ROOT, p)
    html = open(fp, encoding="utf-8", errors="ignore").read()
    h1s = [re.sub(r"<[^>]+>", "", h).strip() for h in re.findall(r"<h1[^>]*>(.*?)</h1>", html, re.DOTALL)]
    h2s = [re.sub(r"<[^>]+>", "", h).strip()[:50] for h in re.findall(r"<h2[^>]*>(.*?)</h2>", html, re.DOTALL)]
    print(p)
    print("  H1: " + str(h1s))
    print("  H2: " + str(h2s[:5]))

# ---- all titles + lengths ----
print("\n=== ALL PAGE TITLES + LENGTHS ===")
all_html = []
for root, dirs, files in os.walk(ROOT):
    dirs[:] = [d for d in dirs if d not in ["node_modules", ".git", "assets", "scripts"]]
    for f in files:
        if f.endswith(".html"):
            all_html.append(os.path.join(root, f))
all_html.sort()
for fp in all_html:
    html = open(fp, encoding="utf-8", errors="ignore").read()
    t = re.search(r"<title>(.*?)</title>", html, re.DOTALL)
    rel = os.path.relpath(fp, ROOT)
    if t:
        title = t.group(1).strip()
        status = "OK" if 30 <= len(title) <= 60 else ("TOO LONG" if len(title) > 60 else "TOO SHORT")
        print(str(len(title)).rjust(3) + "ch  [" + status + "]  " + rel + "  =>  " + title[:80])
    else:
        print("  0ch  [MISSING]  " + rel)

# ---- all descriptions + lengths ----
print("\n=== ALL META DESCRIPTIONS + LENGTHS ===")
for fp in all_html:
    html = open(fp, encoding="utf-8", errors="ignore").read()
    d = re.search('name="description" content="([^"]+)"', html)
    rel = os.path.relpath(fp, ROOT)
    if d:
        desc = d.group(1).strip()
        status = "OK" if 50 <= len(desc) <= 160 else ("TOO LONG" if len(desc) > 160 else "TOO SHORT")
        print(str(len(desc)).rjust(3) + "ch  [" + status + "]  " + rel)
    else:
        print("  0ch  [MISSING]  " + rel)

# ---- service page keywords check ----
print("\n=== SERVICE PAGE KEYWORDS (sample 5) ===")
srv = os.path.join(ROOT, "services")
for f in sorted(os.listdir(srv))[:5]:
    if f.endswith(".html"):
        fp = os.path.join(srv, f)
        html = open(fp, encoding="utf-8", errors="ignore").read()
        kw = re.search('name="keywords" content="([^"]+)"', html)
        if kw:
            print(f + ": " + kw.group(1)[:120])

print("\nDone.")
