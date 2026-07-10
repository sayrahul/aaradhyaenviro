import os
import re

html_files = [os.path.join(r, f) for r, d, files in os.walk('.') for f in files if f.endswith('.html') and 'node_modules' not in r]

nav_start_regex = re.compile(r'<div[^>]*class="[^"]*fixed bottom-0[^"]*md:hidden[^"]*"[^>]*>')

for fpath in html_files:
    filename = os.path.basename(fpath)
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    match = nav_start_regex.search(content)
    if not match:
        continue
        
    navbar_start = match.start()
    
    # Use WhatsApp button as the end marker
    bottom_20 = content.find('bottom-20 right-4', navbar_start)
    if bottom_20 != -1:
        div_bottom_20 = content.rfind('<div', navbar_start, bottom_20)
        if div_bottom_20 != -1:
            navbar_end = div_bottom_20
        else:
            navbar_end = content.find('</body>', navbar_start)
    else:
        navbar_end = content.find('</body>', navbar_start)
        
    navbar_content = content[navbar_start:navbar_end]
    
    # 1. REMOVE BLOG BUTTON
    blog_pattern = re.compile(r'<a[^>]*href="blog\.html"[^>]*>.*?<span[^>]*>\s*Blog\s*</span>\s*</a>', re.DOTALL | re.IGNORECASE)
    navbar_content = blog_pattern.sub('', navbar_content)
    
    # 2. STRIP EXISTING INDICATORS
    indicator_pattern = re.compile(r'<div[^>]*class="[^"]*absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-teal-600 rounded-t-full[^"]*"[^>]*></div>', re.DOTALL)
    navbar_content = indicator_pattern.sub('', navbar_content)
    
    # 3. FIX ACTIVE STATES
    a_tag_pattern = re.compile(r'(<a\s+[^>]*>)(.*?)(</a>)', re.DOTALL)
    
    def process_a_tag(match):
        a_open = match.group(1)
        a_inner = match.group(2)
        a_close = match.group(3)
        
        href_match = re.search(r'href="([^"]+)"', a_open)
        is_active = False
        if href_match:
            href = href_match.group(1).strip()
            if filename == 'index.html' and (href == 'index.html' or href == '/' or href == ''):
                is_active = True
            elif href.endswith(filename):
                is_active = True
                
        # Fix <a> classes entirely
        class_match = re.search(r'class="([^"]+)"', a_open)
        if class_match:
            active_class = "relative flex flex-col items-center justify-center py-2 px-1 min-w-0 flex-1 transition-all duration-200 rounded-lg mx-1 text-teal-600 bg-teal-50 shadow-sm active:scale-95 active:bg-teal-100"
            inactive_class = "relative flex flex-col items-center justify-center py-2 px-1 min-w-0 flex-1 transition-all duration-200 rounded-lg mx-1 text-gray-600 hover:text-teal-600 hover:bg-teal-50 active:scale-95 active:bg-teal-100"
            
            if is_active:
                a_open = a_open.replace(class_match.group(0), f'class="{active_class}"')
            else:
                a_open = a_open.replace(class_match.group(0), f'class="{inactive_class}"')
                
        # Fix SVG classes
        svg_class_match = re.search(r'(<svg[^>]*class=")([^"]+)(")', a_inner)
        if svg_class_match:
            if is_active:
                a_inner = a_inner.replace(svg_class_match.group(0), svg_class_match.group(1) + "text-lg mb-1 text-teal-600" + svg_class_match.group(3))
            else:
                a_inner = a_inner.replace(svg_class_match.group(0), svg_class_match.group(1) + "text-lg mb-1 text-gray-600" + svg_class_match.group(3))
                
        # Fix Span classes
        span_class_match = re.search(r'(<span[^>]*class=")([^"]+)(")', a_inner)
        if span_class_match:
            if is_active:
                a_inner = a_inner.replace(span_class_match.group(0), span_class_match.group(1) + "text-xs font-medium leading-tight text-center text-teal-600" + span_class_match.group(3))
            else:
                a_inner = a_inner.replace(span_class_match.group(0), span_class_match.group(1) + "text-xs font-medium leading-tight text-center text-gray-600" + span_class_match.group(3))
                
        if is_active:
            indicator = '<div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-teal-600 rounded-t-full"></div>'
            a_inner = a_inner + indicator
            
        return a_open + a_inner + a_close
        
    navbar_content = a_tag_pattern.sub(process_a_tag, navbar_content)
    
    content = content[:navbar_start] + navbar_content + content[navbar_end:]
    
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)

print(f'Fully processed navbars using bottom-20 marker across {len(html_files)} files')
