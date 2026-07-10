import os
import re

html_files = [os.path.join(r, f) for r, d, files in os.walk('.') for f in files if f.endswith('.html') and 'node_modules' not in r]

indicator_html = '<div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-teal-600 rounded-t-full"></div>'

for fpath in html_files:
    filename = os.path.basename(fpath)
    
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the mobile bottom navbar
    navbar_start = content.find('<div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden')
    if navbar_start != -1:
        navbar_end = content.find('</div></div><div class="fixed bottom-20', navbar_start)
        if navbar_end == -1: navbar_end = content.find('</div>\n</div>\n<div class="fixed bottom-20', navbar_start)
        if navbar_end == -1: navbar_end = content.find('</nav>', navbar_start)
        if navbar_end == -1: navbar_end = navbar_start + 4000
        
        navbar_content = content[navbar_start:navbar_end]
        
        # 1. Strip out the hardcoded indicator
        navbar_content = navbar_content.replace(indicator_html, '')
        
        # 2. Reset all <a> tags to inactive state and add 'relative'
        # The active classes are: text-teal-600 bg-teal-50 shadow-sm
        # The inactive classes are: text-gray-600 hover:text-teal-600 hover:bg-teal-50
        navbar_content = navbar_content.replace('text-teal-600 bg-teal-50 shadow-sm', 'text-gray-600 hover:text-teal-600 hover:bg-teal-50')
        
        # Ensure 'relative' is present
        # Replace 'class="flex flex-col' with 'class="relative flex flex-col'
        # But maybe 'relative' is already there? Let's strip it first to be safe, then add.
        navbar_content = navbar_content.replace('class="relative flex flex-col', 'class="flex flex-col')
        navbar_content = navbar_content.replace('class="flex flex-col', 'class="relative flex flex-col')
        
        # Also need to reset the text-teal-600 inside the SVG and span for the active item
        # The active SVG has text-teal-600, inactive has text-gray-600
        # This is harder to regex safely for all. Let's just find the specific <a> tag and rewrite it.
        
        # Actually, let's split the navbar into <a> tags.
        parts = navbar_content.split('<a ')
        new_parts = [parts[0]]
        
        for p in parts[1:]:
            # p contains the rest of the <a> tag
            # Check if this is the target link for the current file
            is_active = False
            # Special case for index.html, sometimes href is empty or / or index.html
            href_match = re.search(r'href="([^"]+)"', p)
            if href_match:
                href = href_match.group(1)
                # handle index.html matching
                if filename == 'index.html' and (href == 'index.html' or href == '/' or href == ''):
                    is_active = True
                elif href.endswith(filename):
                    is_active = True
            
            # Reset this chunk to entirely inactive first
            # SVG class
            p = p.replace('text-teal-600', 'text-gray-600')
            # Now `text-gray-600 bg-teal-50 shadow-sm` might exist, let's just do a clean replace
            
            if is_active:
                # Set active styles
                # Replace 'text-gray-600 hover:text-teal-600 hover:bg-teal-50' with 'text-teal-600 bg-teal-50 shadow-sm'
                p = p.replace('text-gray-600 hover:text-teal-600 hover:bg-teal-50', 'text-teal-600 bg-teal-50 shadow-sm')
                p = p.replace('text-gray-600 hover:text-teal-600 hover:bg-gray-50', 'text-teal-600 bg-teal-50 shadow-sm')
                # SVG color
                p = p.replace('class="text-lg mb-1 text-gray-600"', 'class="text-lg mb-1 text-teal-600"')
                # Span color
                p = p.replace('class="text-xs font-medium leading-tight text-center text-gray-600"', 'class="text-xs font-medium leading-tight text-center text-teal-600"')
                
                # Re-insert indicator before </a>
                p = p.replace('</a>', indicator_html + '</a>')
            
            new_parts.append(p)
            
        new_navbar_content = '<a '.join(new_parts)
        
        # Fix any edge case where we replaced text-teal-600 incorrectly outside of the intended classes
        # (Though we were careful to replace specific class strings)
        
        content = content[:navbar_start] + new_navbar_content + content[navbar_end:]
        
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)

print(f'Processed active states for {len(html_files)} files')
