import os
import re

html_files = [os.path.join(r, f) for r, d, files in os.walk('.') for f in files if f.endswith('.html') and 'node_modules' not in r]

indicator_html = '<div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-teal-600 rounded-t-full"></div>'

for fpath in html_files:
    filename = os.path.basename(fpath)
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    navbar_start = content.find('<div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden')
    if navbar_start != -1:
        navbar_end = content.find('</div></div><div class="fixed bottom-20', navbar_start)
        if navbar_end == -1: navbar_end = content.find('</div>\n</div>\n<div class="fixed bottom-20', navbar_start)
        if navbar_end == -1: navbar_end = content.find('</nav>', navbar_start)
        if navbar_end == -1: navbar_end = navbar_start + 4000
        
        navbar_content = content[navbar_start:navbar_end]
        
        # 1. Clean up indicator completely
        navbar_content = navbar_content.replace(indicator_html, '')
        
        # 2. Reset all to inactive state precisely
        # Find all <a> tags and rewrite their main class completely
        parts = navbar_content.split('<a ')
        new_parts = [parts[0]]
        
        for p in parts[1:]:
            # Extract href
            href_match = re.search(r'href="([^"]+)"', p)
            is_active = False
            if href_match:
                href = href_match.group(1)
                if filename == 'index.html' and (href == 'index.html' or href == '/' or href == ''):
                    is_active = True
                elif href.endswith(filename):
                    is_active = True
                    
            # Normalize class
            # we want to replace the class="... " part entirely
            class_match = re.search(r'class="([^"]+)"', p)
            if class_match:
                old_class = class_match.group(1)
                
                # Active class:
                # relative flex flex-col items-center justify-center py-2 px-1 min-w-0 flex-1 transition-all duration-200 rounded-lg mx-1 text-teal-600 bg-teal-50 shadow-sm active:scale-95 active:bg-teal-100
                
                # Inactive class:
                # relative flex flex-col items-center justify-center py-2 px-1 min-w-0 flex-1 transition-all duration-200 rounded-lg mx-1 text-gray-600 hover:text-teal-600 hover:bg-teal-50 active:scale-95 active:bg-teal-100
                
                if is_active:
                    new_class = "relative flex flex-col items-center justify-center py-2 px-1 min-w-0 flex-1 transition-all duration-200 rounded-lg mx-1 text-teal-600 bg-teal-50 shadow-sm active:scale-95 active:bg-teal-100"
                else:
                    new_class = "relative flex flex-col items-center justify-center py-2 px-1 min-w-0 flex-1 transition-all duration-200 rounded-lg mx-1 text-gray-600 hover:text-teal-600 hover:bg-teal-50 active:scale-95 active:bg-teal-100"
                
                p = p.replace(f'class="{old_class}"', f'class="{new_class}"', 1)
            
            # Now SVG and span
            # SVG should be text-teal-600 if active, text-gray-600 if inactive
            # Span should be text-teal-600 if active, text-gray-600 if inactive
            svg_class_match = re.search(r'<svg[^>]*class="([^"]+)"', p)
            if svg_class_match:
                old_svg_class = svg_class_match.group(1)
                if is_active:
                    new_svg_class = "text-lg mb-1 text-teal-600"
                else:
                    new_svg_class = "text-lg mb-1 text-gray-600"
                p = p.replace(f'class="{old_svg_class}"', f'class="{new_svg_class}"', 1)
                
            span_class_match = re.search(r'<span[^>]*class="([^"]+)"', p)
            if span_class_match:
                old_span_class = span_class_match.group(1)
                if is_active:
                    new_span_class = "text-xs font-medium leading-tight text-center text-teal-600"
                else:
                    new_span_class = "text-xs font-medium leading-tight text-center text-gray-600"
                p = p.replace(f'class="{old_span_class}"', f'class="{new_span_class}"', 1)
                
            if is_active:
                p = p.replace('</a>', indicator_html + '</a>')
                
            new_parts.append(p)
            
        new_navbar_content = '<a '.join(new_parts)
        
        content = content[:navbar_start] + new_navbar_content + content[navbar_end:]
        
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)

print(f'Fixed active states correctly across {len(html_files)} files')
