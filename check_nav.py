import os

html_files = [f for f in os.listdir('.') if f.endswith('.html')]
for f in html_files:
    if f in ['index.html', 'about.html', 'services.html']:
        content = open(f, 'r', encoding='utf-8').read()
        start = content.find('<div class="fixed bottom-0')
        if start != -1:
            end = content.find('</div></div><div class="fixed bottom-20', start)
            if end == -1: end = content.find('</div>\n</div>\n<div class="fixed bottom-20', start)
            if end == -1: end = content.find('</nav>', start)
            
            nav_content = content[start:end]
            
            print(f'\n--- {f} active tags ---')
            for line in nav_content.split('<a '):
                if 'text-teal-600 bg-teal-50' in line:
                    print('ACTIVE:', line[:150])
