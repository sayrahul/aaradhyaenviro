// Hindi (/hi) and Marathi (/mr) landing pages for local searches and AI assistants answering in those
// languages. Linked to the English home page with hreflang alternates.
const site = require('../config');
const { services } = require('../data/services');
const { esc, icon, photo, waLink, telLink } = require('../lib/html');
const { quickAnswer } = require('../lib/components');
const schema = require('../lib/schema');

const ALTERNATES = [
  { lang: 'en-IN', path: '/' },
  { lang: 'hi-IN', path: '/hi' },
  { lang: 'mr-IN', path: '/mr' },
  { lang: 'x-default', path: '/' },
];

const T = {
  hi: {
    lang: 'hi-IN', locale: 'hi_IN', path: '/hi', file: 'hi.html',
    title: 'पर्यावरण सलाहकार, छत्रपति संभाजीनगर – MPCB, ETP, STP',
    description: 'आराध्य एनवायरो – वालुज MIDC, छत्रपति संभाजीनगर। MPCB सहमति, पर्यावरण मंजूरी, ETP/STP, ZLD, प्रदूषण नियंत्रण और टेस्टिंग। 500+ क्लाइंट्स। कॉल करें।',
    eyebrow: 'वालुज MIDC, छत्रपति संभाजीनगर',
    h1: 'पर्यावरण अनुपालन और प्रदूषण नियंत्रण – एक ही भरोसेमंद टीम',
    lead: `MPCB सहमति (CTE/CTO), पर्यावरण मंजूरी (EC), ETP/STP प्लांट, ZLD, वायु प्रदूषण नियंत्रण, टेस्टिंग और प्लांट संचालन — ${site.foundingYear} से महाराष्ट्र के ${site.clientsCount} क्लाइंट्स का भरोसा।`,
    answer: `आराध्य एनवायरो छत्रपति संभाजीनगर (वालुज MIDC) की पर्यावरण सलाहकार और टर्नकी प्रदूषण नियंत्रण कंपनी है। ${site.foundingYear} में स्थापित, हम MPCB सहमति, पर्यावरण मंजूरी, ETP/STP और ZLD प्लांट, टेस्टिंग, खतरनाक कचरा व EPR अनुपालन और प्लांट संचालन जैसी ${services.length} सेवाएँ देते हैं।`,
    cta: 'मुफ्त सलाह लें', wa: 'WhatsApp पर बात करें', call: 'कॉल करें',
    stats: [['500+', 'क्लाइंट्स'], ['10+ वर्ष', 'टीम का अनुभव'], [site.foundingYear, 'स्थापना'], [String(services.length), 'विशेष सेवाएँ']],
    servicesTitle: 'हमारी मुख्य सेवाएँ',
    services: [
      ['shield-check', 'MPCB सहमति (CTE / CTO)', 'नया उद्योग शुरू करने से पहले Consent to Establish और उत्पादन से पहले Consent to Operate — आवेदन, दस्तावेज़ और फॉलो-अप।', '/services/legal-compliances'],
      ['file-text', 'पर्यावरण मंजूरी (EC)', 'EIA अधिसूचना 2006 के तहत SEIAA / MoEFCC से मंजूरी, EIA समन्वय और छमाही अनुपालन रिपोर्ट।', '/services/environmental-clearances'],
      ['droplet', 'ETP और STP प्लांट', 'आपके वास्तविक अपशिष्ट जल के आधार पर डिज़ाइन, इंस्टॉलेशन और कमीशनिंग, ताकि MPCB मानक पूरे हों।', '/services/etp-stp-installation'],
      ['recycle', 'ZLD और RO सिस्टम', 'Zero Liquid Discharge — पानी का पुन: उपयोग और शून्य तरल निर्वहन के लिए UF, RO, इवैपोरेटर।', '/services/zld-ro-systems'],
      ['wind', 'वायु प्रदूषण नियंत्रण', 'स्क्रबर, बैग फ़िल्टर, साइक्लोन और चिमनी — उत्सर्जन सीमा के अनुसार।', '/services/air-pollution-control'],
      ['flask', 'हवा, पानी और मिट्टी की टेस्टिंग', 'मान्यता प्राप्त प्रयोगशालाओं से स्टैक, एम्बिएंट एयर और अपशिष्ट जल की जाँच।', '/services/environmental-testing'],
      ['alert', 'खतरनाक कचरा प्रबंधन', 'प्राधिकरण, भंडारण, मैनिफेस्ट और वार्षिक रिटर्न (30 जून तक)।', '/services/hazardous-waste-management'],
      ['clipboard-check', 'ऑडिट और रिपोर्टिंग', 'पर्यावरण विवरण (Form V) हर वर्ष 30 सितंबर तक और अनुपालन ऑडिट।', '/services/audit-reporting'],
    ],
    allServices: 'सभी 17 सेवाएँ देखें (अंग्रेज़ी में)',
    whyTitle: 'आराध्य एनवायरो क्यों?',
    why: [
      ['map-pin', 'स्थानीय अनुभव', 'वालुज MIDC में स्थित — MPCB की प्रक्रियाओं का रोज़ का अनुभव।'],
      ['route', 'एक ही पार्टनर, हर चरण', 'डिज़ाइन → मंजूरी → इंस्टॉलेशन → टेस्टिंग → संचालन → नवीनीकरण।'],
      ['clipboard-check', 'भरोसेमंद अनुपालन', 'रिपोर्ट और रिकॉर्ड आपके वास्तविक संचालन से मेल खाते हैं — निरीक्षण में कोई परेशानी नहीं।'],
      ['clock', 'तुरंत सहायता', 'फ़ोन और WhatsApp पर कभी भी संपर्क करें।'],
    ],
    faqTitle: 'अक्सर पूछे जाने वाले सवाल',
    faqs: [
      ['क्या मेरे उद्योग को MPCB सहमति चाहिए?', 'महाराष्ट्र में जो भी उद्योग या परियोजना अपशिष्ट जल छोड़ती है, वायु उत्सर्जन करती है या खतरनाक कचरा बनाती है, उसे MPCB सहमति चाहिए — निर्माण से पहले CTE और उत्पादन से पहले CTO। केवल White श्रेणी के उद्योगों को सहमति की आवश्यकता नहीं होती।'],
      ['ETP और STP में क्या अंतर है?', 'ETP (Effluent Treatment Plant) औद्योगिक प्रक्रिया के अपशिष्ट जल को साफ़ करता है, जबकि STP (Sewage Treatment Plant) शौचालय, रसोई और बाथरूम के घरेलू सीवेज को। कई फैक्ट्रियों को दोनों की ज़रूरत होती है।'],
      ['ETP की लागत कितनी होती है?', 'लागत प्रवाह (KLD), प्रदूषण भार, TDS, आवश्यक गुणवत्ता और तकनीक पर निर्भर करती है। 10–50 KLD के छोटे ETP अक्सर लगभग ₹5–15 लाख से शुरू होते हैं। सही अनुमान के लिए अपशिष्ट जल की जाँच ज़रूरी है।'],
      ['वार्षिक रिपोर्ट कब जमा करनी होती है?', 'खतरनाक कचरा वार्षिक रिटर्न 30 जून तक और पर्यावरण विवरण (Form V) 30 सितंबर तक। सहमति की समाप्ति से पहले नवीनीकरण आवश्यक है।'],
      ['आप किन क्षेत्रों में काम करते हैं?', 'छत्रपति संभाजीनगर (वालुज, शेंद्रा, चिकलठाणा MIDC), जालना, बीड, लातूर, धाराशिव, नांदेड़, अहिल्यानगर, नाशिक, पुणे, मुंबई, नागपुर सहित पूरे महाराष्ट्र में।'],
    ],
    contactTitle: 'आज ही संपर्क करें',
    contactText: 'अपनी आवश्यकता बताइए — पहली सलाह मुफ्त है। हम आपको स्पष्ट दायरा, समय-सीमा और अनुमान देंगे।',
    address: '10, वडगाव कोल्हाटी, MIDC वालुज क्षेत्र, छत्रपति संभाजीनगर, महाराष्ट्र 431136',
    english: 'Read in English', other: ['मराठी', '/mr'],
    waText: 'नमस्ते आराध्य एनवायरो, मुझे पर्यावरण अनुपालन के बारे में जानकारी चाहिए।',
  },
  mr: {
    lang: 'mr-IN', locale: 'mr_IN', path: '/mr', file: 'mr.html',
    title: 'पर्यावरण सल्लागार, छत्रपती संभाजीनगर – MPCB, ETP, STP',
    description: 'आराध्य एन्व्हायरो – वाळूज MIDC, छत्रपती संभाजीनगर. MPCB संमती, पर्यावरण मंजुरी, ETP/STP, ZLD, प्रदूषण नियंत्रण आणि चाचणी. 500+ ग्राहक. आजच संपर्क करा.',
    eyebrow: 'वाळूज MIDC, छत्रपती संभाजीनगर',
    h1: 'पर्यावरण अनुपालन आणि प्रदूषण नियंत्रण – एकच विश्वासू टीम',
    lead: `MPCB संमती (CTE/CTO), पर्यावरण मंजुरी (EC), ETP/STP प्लांट, ZLD, वायू प्रदूषण नियंत्रण, चाचणी आणि प्लांट संचालन — ${site.foundingYear} पासून महाराष्ट्रातील ${site.clientsCount} ग्राहकांचा विश्वास.`,
    answer: `आराध्य एन्व्हायरो ही छत्रपती संभाजीनगर (वाळूज MIDC) येथील पर्यावरण सल्लागार आणि टर्नकी प्रदूषण नियंत्रण कंपनी आहे. ${site.foundingYear} मध्ये स्थापन झालेली ही कंपनी MPCB संमती, पर्यावरण मंजुरी, ETP/STP आणि ZLD प्लांट, चाचणी, घातक कचरा व EPR अनुपालन आणि प्लांट संचालन अशा ${services.length} सेवा देते.`,
    cta: 'मोफत सल्ला घ्या', wa: 'WhatsApp वर बोला', call: 'कॉल करा',
    stats: [['500+', 'ग्राहक'], ['10+ वर्षे', 'टीमचा अनुभव'], [site.foundingYear, 'स्थापना'], [String(services.length), 'विशेष सेवा']],
    servicesTitle: 'आमच्या प्रमुख सेवा',
    services: [
      ['shield-check', 'MPCB संमती (CTE / CTO)', 'नवीन उद्योग उभारण्यापूर्वी Consent to Establish आणि उत्पादनापूर्वी Consent to Operate — अर्ज, कागदपत्रे आणि पाठपुरावा.', '/services/legal-compliances'],
      ['file-text', 'पर्यावरण मंजुरी (EC)', 'EIA अधिसूचना 2006 अंतर्गत SEIAA / MoEFCC मंजुरी, EIA समन्वय आणि सहामाही अनुपालन अहवाल.', '/services/environmental-clearances'],
      ['droplet', 'ETP आणि STP प्लांट', 'तुमच्या प्रत्यक्ष सांडपाण्यावर आधारित डिझाइन, उभारणी आणि कमिशनिंग, जेणेकरून MPCB मानके पूर्ण होतील.', '/services/etp-stp-installation'],
      ['recycle', 'ZLD आणि RO प्रणाली', 'Zero Liquid Discharge — पाण्याचा पुनर्वापर आणि शून्य द्रव विसर्गासाठी UF, RO, इव्हॅपोरेटर.', '/services/zld-ro-systems'],
      ['wind', 'वायू प्रदूषण नियंत्रण', 'स्क्रबर, बॅग फिल्टर, सायक्लोन आणि चिमणी — उत्सर्जन मर्यादेनुसार.', '/services/air-pollution-control'],
      ['flask', 'हवा, पाणी आणि माती चाचणी', 'मान्यताप्राप्त प्रयोगशाळांमार्फत स्टॅक, सभोवतालची हवा आणि सांडपाणी चाचणी.', '/services/environmental-testing'],
      ['alert', 'घातक कचरा व्यवस्थापन', 'प्राधिकरण, साठवण, मॅनिफेस्ट आणि वार्षिक विवरणपत्र (30 जूनपर्यंत).', '/services/hazardous-waste-management'],
      ['clipboard-check', 'ऑडिट आणि अहवाल', 'पर्यावरण विवरणपत्र (Form V) दरवर्षी 30 सप्टेंबरपर्यंत आणि अनुपालन ऑडिट.', '/services/audit-reporting'],
    ],
    allServices: 'सर्व 17 सेवा पहा (इंग्रजीत)',
    whyTitle: 'आराध्य एन्व्हायरो का?',
    why: [
      ['map-pin', 'स्थानिक अनुभव', 'वाळूज MIDC मध्ये कार्यालय — MPCB प्रक्रियांचा रोजचा अनुभव.'],
      ['route', 'एकच भागीदार, प्रत्येक टप्प्यावर', 'डिझाइन → मंजुरी → उभारणी → चाचणी → संचालन → नूतनीकरण.'],
      ['clipboard-check', 'विश्वासार्ह अनुपालन', 'अहवाल आणि नोंदी तुमच्या प्रत्यक्ष कामकाजाशी जुळतात — तपासणीत अडचण नाही.'],
      ['clock', 'तत्काळ मदत', 'फोन आणि WhatsApp वर कधीही संपर्क करा.'],
    ],
    faqTitle: 'नेहमी विचारले जाणारे प्रश्न',
    faqs: [
      ['माझ्या उद्योगाला MPCB संमती लागते का?', 'महाराष्ट्रात जो उद्योग किंवा प्रकल्प सांडपाणी सोडतो, वायू उत्सर्जन करतो किंवा घातक कचरा निर्माण करतो, त्याला MPCB संमती लागते — बांधकामापूर्वी CTE आणि उत्पादनापूर्वी CTO. फक्त White श्रेणीतील उद्योगांना संमतीची गरज नसते.'],
      ['ETP आणि STP मध्ये काय फरक आहे?', 'ETP (Effluent Treatment Plant) औद्योगिक प्रक्रियेतील सांडपाणी शुद्ध करतो, तर STP (Sewage Treatment Plant) शौचालय, स्वयंपाकघर आणि बाथरूममधील घरगुती सांडपाणी. अनेक कारखान्यांना दोन्हींची गरज असते.'],
      ['ETP चा खर्च किती येतो?', 'खर्च प्रवाह (KLD), प्रदूषण भार, TDS, आवश्यक गुणवत्ता आणि तंत्रज्ञानावर अवलंबून असतो. 10–50 KLD चे लहान ETP साधारणपणे ₹5–15 लाखांपासून सुरू होतात. अचूक अंदाजासाठी सांडपाण्याची चाचणी आवश्यक आहे.'],
      ['वार्षिक अहवाल कधी सादर करावे लागतात?', 'घातक कचरा वार्षिक विवरणपत्र 30 जूनपर्यंत आणि पर्यावरण विवरणपत्र (Form V) 30 सप्टेंबरपर्यंत. संमतीची मुदत संपण्यापूर्वी नूतनीकरण आवश्यक आहे.'],
      ['तुम्ही कोणत्या भागात काम करता?', 'छत्रपती संभाजीनगर (वाळूज, शेंद्रा, चिकलठाणा MIDC), जालना, बीड, लातूर, धाराशिव, नांदेड, अहिल्यानगर, नाशिक, पुणे, मुंबई, नागपूरसह संपूर्ण महाराष्ट्रात.'],
    ],
    contactTitle: 'आजच संपर्क करा',
    contactText: 'तुमची गरज सांगा — पहिला सल्ला मोफत आहे. आम्ही तुम्हाला स्पष्ट कार्यक्षेत्र, वेळापत्रक आणि अंदाज देऊ.',
    address: '10, वडगाव कोल्हाटी, MIDC वाळूज परिसर, छत्रपती संभाजीनगर, महाराष्ट्र 431136',
    english: 'Read in English', other: ['हिंदी', '/hi'],
    waText: 'नमस्कार आराध्य एन्व्हायरो, मला पर्यावरण अनुपालनाबद्दल माहिती हवी आहे.',
  },
};

function render(t) {
  const body = `
<section class="relative isolate overflow-hidden bg-gray-950">
  <div class="absolute inset-0 -z-10">${photo('stp-aerial', { cls: 'h-full w-full object-cover opacity-40', eager: true, alt: '' })}</div>
  <div class="absolute inset-0 -z-10 bg-gradient-to-r from-gray-950 via-gray-950/85 to-gray-950/40"></div>
  <div class="container-x py-16 sm:py-20 lg:py-24">
    <p class="flex flex-wrap items-center gap-3 text-sm">
      <span class="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-medium text-emerald-300">${icon('map-pin', 'w-4 h-4')}${esc(t.eyebrow)}</span>
      <a href="/" hreflang="en" class="text-gray-300 underline hover:text-white">${t.english}</a>
      <a href="${t.other[1]}" class="text-gray-300 underline hover:text-white">${t.other[0]}</a>
    </p>
    <h1 class="mt-6 max-w-4xl text-3xl font-bold leading-snug text-white sm:text-5xl">${esc(t.h1)}</h1>
    <p class="mt-6 max-w-3xl text-lg leading-relaxed text-gray-300">${esc(t.lead)}</p>
    <div class="mt-8 flex flex-col gap-3 sm:flex-row">
      <a href="/contact" class="btn btn-primary btn-lg">${t.cta} ${icon('arrow-right', 'w-5 h-5')}</a>
      <a href="${waLink(t.waText)}" target="_blank" rel="noopener" class="btn btn-outline-light btn-lg">${icon('whatsapp', 'w-5 h-5')}${t.wa}</a>
    </div>
  </div>
</section>

<section class="bg-white pt-12">
  <div class="container-x">
    <dl class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-gray-200 lg:grid-cols-4">
      ${t.stats.map(([v, l]) => `<div class="bg-white px-6 py-7 text-center"><dt class="text-sm text-gray-600">${esc(l)}</dt><dd class="order-first text-3xl font-bold text-gray-900">${esc(v)}</dd></div>`).join('')}
    </dl>
    <div class="mx-auto mt-10 max-w-4xl">${quickAnswer(t.answer)}</div>
  </div>
</section>

<section class="section bg-white">
  <div class="container-x">
    <h2 class="h2 text-center">${t.servicesTitle}</h2>
    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      ${t.services.map(([ic, name, text, href]) => `<a href="${href}" class="card group flex flex-col p-6 hover:border-emerald-300 hover:shadow-lg">
        <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white">${icon(ic, 'w-6 h-6')}</span>
        <h3 class="mt-5 text-lg font-semibold text-gray-900">${esc(name)}</h3>
        <p class="mt-2 flex-1 text-sm leading-relaxed text-gray-600">${esc(text)}</p>
      </a>`).join('\n      ')}
    </div>
    <p class="mt-8 text-center"><a href="/services" hreflang="en" class="btn btn-outline">${t.allServices} ${icon('arrow-right', 'w-4 h-4')}</a></p>
  </div>
</section>

<section class="section bg-gray-900">
  <div class="container-x">
    <h2 class="h2 text-center text-white">${t.whyTitle}</h2>
    <ul class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      ${t.why.map(([ic, h, p]) => `<li class="rounded-2xl border border-white/10 bg-white/5 p-6"><span class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300">${icon(ic, 'w-5 h-5')}</span><h3 class="mt-4 font-semibold text-white">${esc(h)}</h3><p class="mt-1 text-sm leading-relaxed text-gray-300">${esc(p)}</p></li>`).join('\n      ')}
    </ul>
  </div>
</section>

<section class="section bg-white">
  <div class="container-x max-w-3xl">
    <h2 class="h2 text-center">${t.faqTitle}</h2>
    <div class="mt-10 divide-y divide-gray-200 rounded-2xl border border-gray-200">
      ${t.faqs.map(([q, a]) => `<details class="group"><summary class="flex cursor-pointer list-none items-start justify-between gap-4 p-5 font-semibold text-gray-900 hover:text-emerald-700"><span>${esc(q)}</span>${icon('chevron-down', 'mt-0.5 w-5 h-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180')}</summary><div class="px-5 pb-5 leading-relaxed text-gray-600">${esc(a)}</div></details>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="bg-emerald-700">
  <div class="container-x grid gap-8 py-12 lg:grid-cols-2 lg:items-center">
    <div>
      <h2 class="text-2xl font-bold text-white sm:text-3xl">${t.contactTitle}</h2>
      <p class="mt-2 text-emerald-50">${esc(t.contactText)}</p>
      <p class="mt-4 flex gap-2 text-sm text-emerald-50">${icon('map-pin', 'mt-0.5 w-4 h-4 shrink-0')}${esc(t.address)}</p>
    </div>
    <div class="flex flex-wrap gap-3 lg:justify-end">
      <a href="${telLink()}" class="btn bg-white text-emerald-800 hover:bg-emerald-50">${icon('phone', 'w-4 h-4')}${t.call}: ${site.phoneDisplay}</a>
      <a href="${waLink(t.waText)}" target="_blank" rel="noopener" class="btn btn-outline-light">${icon('whatsapp', 'w-4 h-4')}${t.wa}</a>
    </div>
  </div>
</section>
`;
  return {
    path: t.path,
    file: t.file,
    active: 'home',
    lang: t.lang,
    locale: t.locale,
    alternates: ALTERNATES,
    title: t.title,
    description: t.description,
    schema: [
      schema.organization(),
      { '@context': 'https://schema.org', '@type': 'WebPage', url: `${site.siteUrl}${t.path}`, name: t.title, description: t.description, inLanguage: t.lang, about: schema.orgRef },
      { '@context': 'https://schema.org', '@type': 'FAQPage', inLanguage: t.lang, mainEntity: t.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    ],
    body,
  };
}

module.exports = () => [render(T.hi), render(T.mr)];
module.exports.ALTERNATES = ALTERNATES;
