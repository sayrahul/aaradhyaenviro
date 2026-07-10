import os
import re

footer_old = r'<svg[^>]*>\s*<circle cx=\"12\" cy=\"8\" r=\"7\"></circle>\s*<polyline points=\"8\.21 13\.89 7 23 12 20 17 23 15\.79 13\.88\"></polyline>\s*</svg>Certifications</h4>\s*<div class=\"space-y-2\">\s*<p class=\"text-gray-300 text-sm\">✓ ISO 9001:2015 \(QMS\)</p>\s*<p class=\"text-gray-300 text-sm\">✓ ISO 14001:2015 \(EMS\)</p>\s*<p class=\"text-gray-300 text-sm\">✓ ISO 45001:2018 \(OHSMS\)</p>\s*</div>'

footer_new = '''<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" class="mr-2 text-emerald-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 115.3l37.7 114.7H446.4l-97.6 71.3 37.5 115.3L288 345.5l-98.3 71.1 37.5-115.3-97.6-71.3h120.7L288 115.3zM576 224c0-114.9-93.1-208-208-208H208C93.1 16 0 109.1 0 224c0 60.1 25.8 114.4 67 152.1V512l125-56h192l125 56V376.1c41.2-37.7 67-92 67-152.1z"></path></svg>Key Achievements</h4>
                        <div class="space-y-2">
                            <p class="text-gray-300 text-sm">✓ 100+ Projects Completed</p>
                            <p class="text-gray-300 text-sm">✓ 10+ Years of Experience</p>
                            <p class="text-gray-300 text-sm">✓ 50+ Industries Served Across Maharashtra</p>
                        </div>'''

html_files = [os.path.join(r, f) for r, d, files in os.walk('.') for f in files if f.endswith('.html') and 'node_modules' not in r]

count = 0
for fpath in html_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content, num = re.subn(footer_old, footer_new, content)
    
    # Let's also do a fallback just in case the SVG was slightly different
    fallback_old = r'Certifications</h4>\s*<div class=\"space-y-2\">\s*<p class=\"text-gray-300 text-sm\">✓ ISO 9001:2015 \(QMS\)</p>\s*<p class=\"text-gray-300 text-sm\">✓ ISO 14001:2015 \(EMS\)</p>\s*<p class=\"text-gray-300 text-sm\">✓ ISO 45001:2018 \(OHSMS\)</p>\s*</div>'
    fallback_new = '''Key Achievements</h4>
                        <div class="space-y-2">
                            <p class="text-gray-300 text-sm">✓ 100+ Projects Completed</p>
                            <p class="text-gray-300 text-sm">✓ 10+ Years of Experience</p>
                            <p class="text-gray-300 text-sm">✓ 50+ Industries Served Across Maharashtra</p>
                        </div>'''
    
    if num == 0:
        new_content, num = re.subn(fallback_old, fallback_new, new_content)
        
    if num > 0:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1

print(f'Updated footer in {count} files')
