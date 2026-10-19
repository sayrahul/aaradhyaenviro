// Shared content blocks: testimonials, homepage FAQs, products, values.

// Client testimonials (provided by Aaradhya Enviro).
const testimonials = [
  { quote: 'Aaradhya Enviro handled our MPCB Consent to Establish and Consent to Operate documentation flawlessly. The team is highly knowledgeable and made the entire compliance process stress-free for us.', name: 'Rajesh Kumar', role: 'Plant Manager, Jalna Industrial Unit' },
  { quote: 'We had our ETP installed by Aaradhya Enviro and the system has been running perfectly for 3 years. Their O&M team is responsive and ensures we always remain MPCB compliant.', name: 'Suresh Mane', role: 'Director, Beed Manufacturing Co.' },
  { quote: 'Getting Environmental Clearance for our expansion project seemed impossible until we partnered with Aaradhya Enviro. They managed everything from EIA to the public hearing. Excellent team!', name: 'Priya Deshmukh', role: 'CEO, Aurangabad Infrastructure' },
  { quote: 'Our ZLD system was installed on time and within budget. The design team understood our specific chemical effluent requirements and delivered a solution that works perfectly for us.', name: 'Anil Joshi', role: 'Works Manager, Nashik Chemical Plant' },
  { quote: 'We trust Aaradhya Enviro for our annual environmental audit and MPCB Form IV/V submissions. Their thoroughness gives us full confidence during regulatory inspections.', name: 'Vikram Kulkarni', role: 'EHS Head, Pune Auto Components' },
  { quote: 'Aaradhya Enviro guided us through our entire MPCB consent process and installed a fully functional ETP. Their technical knowledge and post-installation support is exceptional.', name: 'Senior Manager', role: 'Rena Sugar, Renapur' },
];

const homeFaqs = [
  { q: 'What are Consent to Establish (CTE) and Consent to Operate (CTO) from MPCB?', a: 'CTE is the permission required from the Maharashtra Pollution Control Board before setting up or expanding an industry or project that may cause pollution. CTO is required after construction, before operations start. Both are issued under the Water Act, 1974 and the Air Act, 1981. Operating without valid consent can lead to closure directions and penalties. Aaradhya Enviro handles the full application process, from documentation to MPCB follow-up.' },
  { q: 'What is the difference between an ETP and an STP?', a: 'An Effluent Treatment Plant (ETP) treats industrial wastewater containing chemicals, oil, heavy metals or other pollutants. A Sewage Treatment Plant (STP) treats domestic wastewater from toilets, kitchens and washrooms. Factories usually need an ETP; housing societies, hospitals, hotels and commercial buildings need an STP; many industrial sites need both.' },
  { q: 'How long does Environmental Clearance (EC) take in Maharashtra?', a: 'Category B projects appraised by SEIAA Maharashtra commonly take a few months, covering documentation, studies and committee appraisal. Category A projects appraised by MoEFCC usually take longer, especially where a public hearing is required. Correct, complete documentation from the start is the biggest factor in avoiding delays.' },
  { q: 'What is ZLD (Zero Liquid Discharge) and is it mandatory?', a: 'ZLD means all wastewater is treated and recovered for reuse, with no liquid effluent discharged outside the premises. It is required for certain highly polluting sectors and is often written as a condition in consents and Environmental Clearances. Even where it is not mandatory, ZLD can significantly cut fresh water costs.' },
  { q: 'How much does an ETP or STP cost?', a: 'Cost depends on the flow (KLD), pollutant load, required treated-water quality, technology and civil scope. As a rough guide, small plants of 10–50 KLD often start in the range of ₹5–15 lakh, while large industrial plants can cost much more. We provide a site assessment and a detailed estimate before you commit. Call +91 99759 29212 for a quote.' },
  { q: 'Do you work outside Chhatrapati Sambhajinagar?', a: 'Yes. We are based in Waluj MIDC, Chhatrapati Sambhajinagar, and work with clients across Maharashtra, including Jalna, Beed, Latur, Nanded, Ahilyanagar, Nashik, Pune, Mumbai and Nagpur. Projects outside Maharashtra are taken up on request.' },
];

const products = [
  {
    name: 'Effluent Treatment Plant (ETP)', image: 'etp-plant', category: 'Wastewater', service: 'etp-stp-installation',
    text: 'Custom-designed turnkey effluent treatment plants that treat industrial wastewater to the limits in your MPCB consent.',
    features: ['Designed from your actual effluent analysis', 'Physico-chemical and biological stages', 'Low operation and maintenance cost', 'Designed to meet MPCB discharge norms'],
    uses: ['Chemical & pharma units', 'Engineering & metal finishing', 'Textile & food processing'],
  },
  {
    name: 'Sewage Treatment Plant (STP)', image: 'stp-packaged', category: 'Wastewater', service: 'etp-stp-installation',
    text: 'Efficient sewage treatment plants (MBBR, SBR, MBR) for safe disposal or reuse of domestic wastewater.',
    features: ['Advanced biological treatment', 'Low odour and low noise operation', 'Compact, space-saving designs', 'Treated water suitable for reuse'],
    uses: ['Housing societies', 'Hospitals & hotels', 'Factories & campuses'],
  },
  {
    name: 'Zero Liquid Discharge (ZLD) System', image: 'zld-plant', category: 'Water Recovery', service: 'zld-ro-systems',
    text: 'Integrated UF, RO, evaporator and dryer systems that recover wastewater for reuse and eliminate liquid discharge.',
    features: ['High-recovery RO', 'MEE / MVR evaporators and ATFD', 'Automation and online monitoring', 'Designed around a site water balance'],
    uses: ['Textile & dyeing', 'Pharmaceutical & chemical', 'Distilleries & food processing'],
  },
  {
    name: 'Reverse Osmosis (RO) System', image: 'ro-system', category: 'Water Recovery', service: 'zld-ro-systems',
    text: 'Industrial RO plants for process water, boiler feed water and treated-effluent recovery.',
    features: ['High recovery rates', 'Automated controls and CIP', 'Anti-scalant dosing', 'Skid-mounted, compact design'],
    uses: ['Pharmaceuticals', 'Food & beverage', 'Boiler feed water'],
  },
  {
    name: 'Water Treatment Plant (WTP)', image: 'wtp', category: 'Water Treatment', service: 'etp-stp-installation',
    text: 'Raw water treatment with filtration, softening and disinfection for industrial, commercial and domestic use.',
    features: ['Multi-stage filtration', 'Softening and chemical dosing', 'Consistent water quality', 'Robust, durable construction'],
    uses: ['Process & utility water', 'Cooling towers', 'Drinking water supply'],
  },
  {
    name: 'Air Pollution Control System', image: 'apc-scrubber', category: 'Air', service: 'air-pollution-control',
    text: 'Wet scrubbers, bag filters, cyclones and stacks designed, fabricated and erected to meet emission limits.',
    features: ['High particulate removal', 'Custom scrubber designs', 'Stack with sampling facility', 'Designed to MPCB emission norms'],
    uses: ['Boilers & furnaces', 'Chemical process vents', 'Foundries & coating lines'],
  },
  {
    name: 'Online Monitoring System', image: 'monitoring-room', category: 'Monitoring', service: 'online-monitoring-systems',
    text: 'Continuous emission and effluent monitoring with live data transfer to CPCB / MPCB servers and display boards.',
    features: ['Real-time data logging', 'CPCB / MPCB server connectivity', 'Calibration and maintenance support', 'Digital display boards'],
    uses: ['ETP / STP outlets', 'Boiler & process stacks', 'Common treatment facilities'],
  },
];

const values = [
  { icon: 'leaf', title: 'Environment first', text: 'Every solution is designed to protect air, water and soil, not just to pass an inspection.' },
  { icon: 'users', title: 'Client-centric support', text: 'Timely, responsive service from the first site visit to years of ongoing O&M.' },
  { icon: 'award', title: 'Engineering quality', text: 'Designs based on real data, proven technology and careful execution.' },
  { icon: 'shield-check', title: 'Trust & transparency', text: 'Clear scope, honest timelines and documentation you can rely on.' },
];

const reasons = [
  { icon: 'map-pin', title: 'Local regulatory expertise', text: 'Based in Waluj MIDC with deep, day-to-day experience of MPCB procedures across Maharashtra.' },
  { icon: 'route', title: 'One partner, every stage', text: 'Design → approvals → installation → testing → O&M → renewals, under a single accountable team.' },
  { icon: 'clipboard-check', title: 'Compliance that holds up', text: 'Reports and records prepared to match your actual operations, so inspections hold no surprises.' },
  { icon: 'clock', title: 'Responsive support', text: 'Reach us on phone and WhatsApp at any time for urgent compliance or breakdown issues.' },
];

module.exports = { testimonials, homeFaqs, products, values, reasons };
