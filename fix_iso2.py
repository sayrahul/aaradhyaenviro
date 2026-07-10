import os
import re

html_files = [os.path.join(r, f) for r, d, files in os.walk('.') for f in files if f.endswith('.html') and 'node_modules' not in r]

for fpath in html_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # index.html
    content = content.replace('ISO 14001 &amp; 45001 Certified', 'Experienced Team')
    content = content.replace('ISO 14001 & 45001 Certified', 'Experienced Team')
    
    # about.html
    content = content.replace('ISO 9001, 14001 & 45001 certified.', '')
    content = content.replace('ISO 9001, 14001 &amp; 45001 Certified', 'Experienced Expert Team')
    content = content.replace('ISO 9001, 14001 & 45001 Certified', 'Experienced Expert Team')
    content = content.replace('ISO-certified (9001, 14001, 45001) ', '')
    content = content.replace('14001:2015, and ISO 45001:2018 certifications', 'the highest industry standards')
    content = content.replace('14001:2015, and ISO 45001:2018', 'the highest quality standards')
    
    # Check if footer certification is still present and replace it
    if '✓ ISO 14001:2015 (EMS)' in content:
        # This means the footer didn't get replaced in this file. Let's force replace it.
        # find the certifications div and replace
        old_div = re.search(r'<div[^>]*>\s*<h4[^>]*>[^<]*<svg[^>]*>.*?</svg>Certifications</h4>\s*<div class="space-y-2">\s*<p[^>]*>✓ ISO 9001:2015 \(QMS\)</p>\s*<p[^>]*>✓ ISO 14001:2015 \(EMS\)</p>\s*<p[^>]*>✓ ISO 45001:2018 \(OHSMS\)</p>\s*</div>\s*</div>', content, re.DOTALL)
        if old_div:
            new_div = '''<div>
                        <h4 class="text-xl font-bold mb-4 flex items-center"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" class="mr-2 text-emerald-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 115.3l37.7 114.7H446.4l-97.6 71.3 37.5 115.3L288 345.5l-98.3 71.1 37.5-115.3-97.6-71.3h120.7L288 115.3zM576 224c0-114.9-93.1-208-208-208H208C93.1 16 0 109.1 0 224c0 60.1 25.8 114.4 67 152.1V512l125-56h192l125 56V376.1c41.2-37.7 67-92 67-152.1z"></path></svg>Key Achievements</h4>
                        <div class="space-y-2">
                            <p class="text-gray-300 text-sm">✓ 100+ Projects Completed</p>
                            <p class="text-gray-300 text-sm">✓ 10+ Years of Experience</p>
                            <p class="text-gray-300 text-sm">✓ 50+ Industries Served Across Maharashtra</p>
                        </div>
                    </div>'''
            content = content.replace(old_div.group(0), new_div)
            
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)

print(f'Cleaned up ISO 14001 and 45001 text in all files')
