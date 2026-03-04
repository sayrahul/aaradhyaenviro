import os

services = [
    {
        "name": "Engineering Services",
        "url": "./services/engineering-services-consultancy.html",
        "icon": '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>'
    },
    {
        "name": "Environmental Audit",
        "url": "./services/environmental-audit.html",
        "icon": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><circle cx="10" cy="13" r="2"></circle><line x1="11.4" y1="14.4" x2="14" y2="17"></line>'
    },
    {
        "name": "Legal Compliance",
        "url": "./services/legal-compliance.html",
        "icon": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path>'
    },
    {
        "name": "STP & ETP Plants",
        "url": "./services/stp-etp-plants.html",
        "icon": '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path>'
    },
    {
        "name": "WTP & RO Plants",
        "url": "./services/wtp-ro-plants.html",
        "icon": '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>'
    },
    {
        "name": "Air Pollution Control",
        "url": "./services/air-pollution-control.html",
        "icon": '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>'
    },
    {
        "name": "Waste Management",
        "url": "./services/waste-management.html",
        "icon": '<path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>'
    },
    {
        "name": "Environmental Consultation",
        "url": "./services/environmental-consultation.html",
        "icon": '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>'
    },
    {
        "name": "Noise Monitoring",
        "url": "./services/noise-monitoring.html",
        "icon": '<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>'
    },
    {
        "name": "AMC Services",
        "url": "./services/annual-maintenance.html",
        "icon": '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>'
    },
    {
        "name": "Environmental Clearances",
        "url": "./services/environmental-clearances.html",
        "icon": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M9 15l2 2 4-4"></path>'
    },
    {
        "name": "NOC from CGWA",
        "url": "./services/noc-cgwa.html",
        "icon": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>'
    }
]

html_cards = []
for svc in services:
    card = f"""            <div class="flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_22%] min-w-0 pr-4 snap-start">
              <a class="block group h-full" href="{svc['url']}">
                <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-orange-300 h-full flex flex-col">
                  <div class="relative h-40 sm:h-48 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-6 group-hover:from-orange-100 group-hover:to-orange-200 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500 group-hover:text-orange-600 transition-transform duration-300 group-hover:scale-110">
                      {svc['icon']}
                    </svg>
                  </div>
                  <div class="p-5 text-center flex-grow flex items-center justify-center">
                    <h3 class="text-base sm:text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">{svc['name']}</h3>
                  </div>
                </div>
              </a>
            </div>"""
    html_cards.append(card)

new_content = """        <div class="relative w-full overflow-hidden">
          <style>
             .hide-scrollbar::-webkit-scrollbar { display: none; }
             .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          </style>
          <div class="flex overflow-x-auto pb-8 pt-4 -mx-4 px-4 snap-x snap-mandatory hide-scrollbar space-x-0 cursor-grab active:cursor-grabbing">
""" + "\n".join(html_cards) + """
          </div>
        </div>"""

with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

s_p = content.find('wide range of environmental services.</p>')
if s_p == -1:
    print("Cannot find intro")
    exit(1)

div_close = content.find('</div>', s_p) + 6
e_p = content.find('<div class="text-center mt-8 lg:mt-12">', div_close)
if e_p == -1:
    print("Cannot find end marker")
    exit(1)

new_code = content[:div_close] + "\n" + new_content + "\n" + content[e_p:]
new_code = new_code.replace('href="./products.html"><button', 'href="./services.html"><button')
new_code = new_code.replace('View\\n              All Products', 'View All Services')
new_code = new_code.replace('View All Products', 'View All Services')

with open("index.html", "w", encoding="utf-8") as f:
    f.write(new_code)
print("Success")
