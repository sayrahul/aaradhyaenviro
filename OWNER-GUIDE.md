# Aaradhya Enviro – Owner Guide (aapke end ke kaam)

Website ka code ready hai. Neeche wale kaam **aapke accounts** (Cloudflare, Google, GitHub) se hi ho sakte hain.
Order me karein — Step 1 aur 2 sabse zaroori hain.

---

## Step 1 — Website live karna (deploy)

Saare changes abhi aapke computer pe hain, GitHub pe nahi gaye.

```bash
cd "D:\My Web Sites\Aaradhya Enviro"
npm install
npm run build          # "Checks passed" aana chahiye
npm run preview        # http://localhost:8080 pe ek baar site dekh lein
git add -A
git commit -m "Website rebuild: clean code, SEO, 17 service pages, 20 blog pages"
git push
```

- Agar Cloudflare GitHub se juda hai (Workers Builds), push hote hi 1–2 minute me site live ho jayegi.
  Cloudflare dashboard → **Workers & Pages → aaradhyaenviro → Deployments** me "Success" dikhna chahiye.
  Build command khaali rakhein (HTML pehle se bani hui commit hoti hai).
- Agar manual deploy karte the: `npx wrangler deploy`

**Live hone ke baad 2 minute ka test:**
1. https://aaradhyaenviro.com kholein — naya design dikhe.
2. https://aaradhyaenviro.com/about.html → apne-aap `/about` pe jana chahiye.
3. https://aaradhyaenviro.com/kuch-bhi → naya 404 page dikhna chahiye.
4. Mobile pe WhatsApp button dabayein → aapka number (99759 29212) khulna chahiye.
5. Contact page se ek **test enquiry** bhejein → apni Google Sheet me entry aayi ya nahi check karein.
6. Browser me F12 → Console: koi laal "Content Security Policy" error nahi hona chahiye.

---

## Step 2 — `www` domain theek karna (bahut zaroori)

Abhi `www.aaradhyaenviro.com` ka DNS record hi nahi hai, isliye www wala link khulta hi nahi.
Website ab `https://aaradhyaenviro.com` (bina www) ko main address maanti hai.

Cloudflare dashboard (aaradhyaenviro.com domain) me — `www` ko Worker se **nahi** jodna, sirf redirect karna hai:
1. **DNS → Records → Add record**: Type `A`, Name `www`, IPv4 `192.0.2.1`, Proxy status **Proxied (orange cloud ON)**, TTL Auto → Save.
   (192.0.2.1 ek placeholder IP hai; orange cloud ON hone se request Cloudflare pe hi ruk ke redirect ho jati hai.)
2. **Rules → Redirect Rules → Create rule** (ya template "Redirect from WWW to root"):
   - Rule name: `www to root`
   - When incoming requests match → **Wildcard pattern** → Request URL: `https://www.aaradhyaenviro.com/*`
   - Then → Target URL: `https://aaradhyaenviro.com/${1}` · Status code **301** · **Preserve query string ✓** → Deploy.
3. **SSL/TLS → Edge Certificates → "Always Use HTTPS" = ON** (http://www bhi pehle https pe aa jayega, phir redirect).
4. **Speed → Optimization → Rocket Loader = OFF** (ye naye security headers ke saath script tod deta hai).
5. 5–10 minute baad test: https://www.aaradhyaenviro.com/about kholein → `https://aaradhyaenviro.com/about` pe pahunchna chahiye.

Bonus (email): DNS banner "Add an SPF record" ke liye → Add record: Type `TXT`, Name `@`, Content `v=spf1 include:_spf.google.com ~all`.
Aapka email Google Workspace pe hai (MX = smtp.google.com), isse aapke mail spam me jana kam hoga. Pehle se koi `v=spf1` TXT ho to doosra mat banaiye.

---

## Step 3 — Google Search Console (Google me ranking ke liye)

1. https://search.google.com/search-console → **Add property → Domain** → `aaradhyaenviro.com`.
2. Jo TXT record Google de, use Cloudflare **DNS → Add record** me daal dein → Verify.
3. **Sitemaps** → `https://aaradhyaenviro.com/sitemap.xml` submit karein.
   (Purana `image-sitemap.xml` ya `www` wala sitemap list me ho to remove kar dein.)
4. **URL Inspection** me ye pages daal ke "Request indexing" karein:
   `/`, `/services`, `/services/legal-compliances`, `/services/etp-stp-installation`, `/services/zld-ro-systems`, `/contact`.
5. 2–4 hafte baad **Pages** report dekhein. "Page with redirect" me purane `.html` URLs dikhenge — ye normal hai.

---

## Step 4 — Google Business Profile (local search / Maps)

1. https://business.google.com pe profile verify/update karein:
   - Website: `https://aaradhyaenviro.com`
   - Category: **Environmental consultant** (+ "Water treatment supplier" agar laagu ho)
   - Address, phone exactly website jaisa: *10, Wadgaon Kolhati, MIDC Waluj Area, Chhatrapati Sambhajinagar 431136*, +91 99759 29212
   - Hours: sahi timing daalein (website pe abhi "24/7 on phone & WhatsApp" likha hai — galat ho to batayein)
   - Services list me website ki 17 services daalein, office aur site ki **asli photos** upload karein.
2. Profile ka **review link** ("Ask for reviews" → copy link) aur **Maps share link** copy karein.
3. `src/config.js` me daalein:
   ```js
   googleBusinessUrl: 'https://maps.app.goo.gl/....',
   googleReviewUrl: 'https://g.page/r/..../review',
   ```
   `npm run build` → commit → push. Isse website pe "Review us on Google" button aur sahi directions link aa jayega.
4. Apne 500+ clients me se satisfied clients ko review link WhatsApp karein — real Google reviews sabse bada trust aur ranking signal hain.

---

## Step 5 — Google Analytics (kitne log aaye, kitni enquiry aayi)

1. https://analytics.google.com → Admin → Create property → Web stream → `https://aaradhyaenviro.com`.
2. Measurement ID copy karein (`G-XXXXXXXXXX`).
3. `src/config.js` me: `ga4Id: 'G-XXXXXXXXXX',` → `npm run build` → commit → push.
4. Website apne-aap ye events bhejegi: `click_call`, `click_whatsapp`, `click_email`, `generate_lead` (form submit), `callback_open`.
   GA4 → Admin → Events me `generate_lead` ko **Key event** mark kar dein.

(Search Console HTML-tag verification chahiye to code `googleSiteVerification` me daal sakte hain — DNS verification se kaam ho jaye to zaroorat nahi.)

---

## Step 6 — Content jo sirf aap de sakte hain (trust badhane ke liye)

| Kya | Kahan daalna hai | Kyun |
|---|---|---|
| **Asli project photos** (ETP, STP, ZLD, site visits, team) | `src/images/photos/` + entry `src/data/images.js` me, phir `npm run images && npm run build` | Abhi zyada photos stock/illustrative hain; gallery pe "representative images" note laga hai |
| Team ke naam + photos (Founder, Engineers) | `src/pages/about.js` → `team` list | Google aur clients dono "kaun log hain" dekhte hain (E-E-A-T) |
| Business hours confirm | `src/config.js` → `hours`, `openingHoursSchema` | Abhi "24/7 on phone & WhatsApp" hai |
| Facebook / Instagram / LinkedIn pages sach me hain? | `src/config.js` → `social` | Jo page exist nahi karta use hata dein |
| Case studies (industry, problem, solution, result) | Naya blog post ya service page section | Sabse strong sales content |
| Projects ki ginti (agar batana ho) | `src/config.js` → `stats` | Abhi: 500+ clients, 10+ years team experience, founded 2018, 17 services |

---

## Step 7 — Spam se bachav (optional, recommended)

Forms me already hidden "honeypot" field hai jo zyada tar bots rok deta hai.
Agar phir bhi spam aaye: Cloudflare **Turnstile** (free) laga sakte hain — site key milne pe developer form me 10 minute me add kar dega
(CSP me `https://challenges.cloudflare.com` allow karna padega).

Apps Script (Google Sheet) wale form endpoints wahi purane hain, field names bhi same hain
(contact: `name, email, mobile, serviceType, urgency, message`; call-back: `name, phone, email`), isliye Sheet me kuch badalna nahi hai.

---

## Roz-marra ke edits kaise karein

1. Text badalna hai → upar wali table me file dhundhein (zyada tar `src/config.js`, `src/data/services.js`, `src/data/content.js`).
2. `npm run build` chalayein — "Checks passed" aana chahiye. Error aaye to wahi line bata dega.
3. `npm run preview` se dekh lein → commit → push.

**Root ke `.html` files kabhi direct edit na karein** — agle build me overwrite ho jayenge.

---

## Har 3 mahine check karein

- Search Console → Pages / Performance (kaun se keywords se log aa rahe hain)
- PageSpeed: https://pagespeed.web.dev → `https://aaradhyaenviro.com` (mobile 90+ target)
- Naya blog article (mahine me 1–2) — MPCB deadlines, Form V, EPR returns jaise topics
- Google reviews ka reply
