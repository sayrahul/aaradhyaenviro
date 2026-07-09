import os
import re
import json

ROOT = r"d:\My Web Sites\aaradhya 2"

def get_all_html():
    files = []
    for root, dirs, filenames in os.walk(ROOT):
        # skip node_modules
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', 'assets', 'scripts']]
        for f in filenames:
            if f.endswith('.html'):
                files.append(os.path.join(root, f))
    return sorted(files)

def extract(html, pattern, group=1, flags=re.IGNORECASE|re.DOTALL):
    m = re.search(pattern, html, flags)
    return m.group(group).strip() if m else 'MISSING'

def extract_all(html, pattern, group=1, flags=re.IGNORECASE|re.DOTALL):
    return [m.group(group).strip() for m in re.finditer(pattern, html, flags)]

def char_len(s):
    return len(s) if s != 'MISSING' else 0

results = []

for filepath in get_all_html():
    rel = os.path.relpath(filepath, ROOT)
    with open(filepath, encoding='utf-8', errors='ignore') as f:
        html = f.read()

    title = extract(html, r'<title>(.*?)</title>')
    desc = extract(html, r'<meta\s+name="description"\s+content="([^"]*)"')
    canonical = extract(html, r'<link\s+rel="canonical"\s+href="([^"]*)"')
    
    # H1 tags
    h1s = extract_all(html, r'<h1[^>]*>(.*?)</h1>')
    h1s_clean = [re.sub(r'<[^>]+>', '', h).strip() for h in h1s]
    
    # Keywords
    keywords = extract(html, r'<meta\s+name="keywords"\s+content="([^"]*)"')
    
    # OG tags
    og_title = extract(html, r'<meta\s+property="og:title"\s+content="([^"]*)"')
    og_desc = extract(html, r'<meta\s+property="og:description"\s+content="([^"]*)"')
    og_image = extract(html, r'<meta\s+property="og:image"\s+content="([^"]*)"')
    og_img_w = extract(html, r'<meta\s+property="og:image:width"\s+content="([^"]*)"')
    
    # Schema types
    schema_types = extract_all(html, r'"@type"\s*:\s*"([^"]+)"')
    
    # Images without alt or empty alt
    imgs_no_alt = len(re.findall(r'<img(?![^>]*alt=)[^>]*>', html, re.IGNORECASE))
    imgs_empty_alt = len(re.findall(r'<img[^>]*alt=""[^>]*>', html, re.IGNORECASE))
    
    # Heading count
    h2s = extract_all(html, r'<h2[^>]*>(.*?)</h2>')
    h2s_clean = [re.sub(r'<[^>]+>', '', h).strip()[:60] for h in h2s]
    
    # Robots
    robots = extract(html, r'<meta\s+name="robots"\s+content="([^"]*)"')
    
    # Twitter card
    tw_card = extract(html, r'<meta\s+name="twitter:card"\s+content="([^"]*)"')
    
    results.append({
        'file': rel,
        'title': title,
        'title_len': char_len(title),
        'desc': desc[:120] + ('...' if len(desc) > 120 else '') if desc != 'MISSING' else 'MISSING',
        'desc_len': char_len(desc),
        'canonical': canonical,
        'h1_count': len(h1s_clean),
        'h1s': h1s_clean,
        'h2_count': len(h2s_clean),
        'h2s': h2s_clean,
        'keywords': keywords[:100] + '...' if keywords != 'MISSING' and len(keywords) > 100 else keywords,
        'og_title': og_title[:60] + '...' if og_title != 'MISSING' and len(og_title) > 60 else og_title,
        'og_image': og_image,
        'og_img_width': og_img_w,
        'schema_types': list(set(schema_types)),
        'imgs_no_alt': imgs_no_alt,
        'imgs_empty_alt': imgs_empty_alt,
        'robots': robots,
        'tw_card': tw_card,
    })

# Print structured report
for r in results:
    print(f"\n{'='*60}")
    print(f"FILE: {r['file']}")
    print(f"  TITLE ({r['title_len']}ch): {r['title']}")
    print(f"  DESC  ({r['desc_len']}ch): {r['desc']}")
    print(f"  CANONICAL: {r['canonical']}")
    print(f"  H1 ({r['h1_count']}): {r['h1s']}")
    print(f"  H2 ({r['h2_count']}): {r['h2s'][:3]}{'...' if r['h2_count']>3 else ''}")
    print(f"  ROBOTS: {r['robots']}")
    print(f"  OG:title={r['og_title']} | img_w={r['og_img_width']}")
    print(f"  SCHEMA: {r['schema_types']}")
    print(f"  IMGS no-alt={r['imgs_no_alt']} | empty-alt={r['imgs_empty_alt']}")

# Summary stats
print(f"\n{'='*60}")
print("SUMMARY STATS")
print(f"Total pages: {len(results)}")

title_issues = [r for r in results if r['title_len'] > 60 or r['title_len'] < 30 or r['title'] == 'MISSING']
print(f"Title tag issues (too short/long/missing): {len(title_issues)}")
for r in title_issues:
    print(f"  {r['file']}: {r['title_len']}ch")

desc_issues = [r for r in results if r['desc_len'] > 160 or r['desc_len'] < 50 or r['desc'] == 'MISSING']
print(f"\nMeta description issues: {len(desc_issues)}")
for r in desc_issues:
    print(f"  {r['file']}: {r['desc_len']}ch")

h1_issues = [r for r in results if r['h1_count'] != 1]
print(f"\nH1 issues (not exactly 1): {len(h1_issues)}")
for r in h1_issues:
    print(f"  {r['file']}: {r['h1_count']} H1s")

no_og_width = [r for r in results if r['og_img_width'] == 'MISSING']
print(f"\nMissing OG image width: {len(no_og_width)}")
for r in no_og_width:
    print(f"  {r['file']}")

no_canonical = [r for r in results if r['canonical'] == 'MISSING']
print(f"\nMissing canonical: {len(no_canonical)}")
for r in no_canonical:
    print(f"  {r['file']}")
