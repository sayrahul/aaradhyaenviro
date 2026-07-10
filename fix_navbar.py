import os
import re

html_files = [os.path.join(r, f) for r, d, files in os.walk('.') for f in files if f.endswith('.html') and 'node_modules' not in r]

blog_btn_pattern = re.compile(r'<a[^>]*href="blog\.html"[^>]*>.*?<span[^>]*>Blog</span></a>')

for fpath in html_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the mobile bottom navbar
    navbar_start = content.find('<div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden')
    if navbar_start != -1:
        # We found a bottom navbar
        navbar_end = content.find('</div></div><div class="fixed bottom-20', navbar_start)
        if navbar_end == -1:
            navbar_end = content.find('</div>\n</div>\n<div class="fixed bottom-20', navbar_start)
        if navbar_end == -1:
            # Fallback
            navbar_end = content.find('</nav>', navbar_start)
            if navbar_end == -1:
                navbar_end = navbar_start + 4000 # rough estimate
        
        navbar_content = content[navbar_start:navbar_end]
        
        # Remove the blog button
        new_navbar_content = blog_btn_pattern.sub('', navbar_content)
        
        # Add active:scale-95 to make it more interactive
        new_navbar_content = new_navbar_content.replace('transition-all duration-200 rounded-lg mx-1', 'transition-all duration-200 rounded-lg mx-1 active:scale-95 active:bg-teal-100')
        new_navbar_content = new_navbar_content.replace('hover:bg-gray-50', 'hover:bg-teal-50')
        
        content = content[:navbar_start] + new_navbar_content + content[navbar_end:]
        
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)

print(f'Processed {len(html_files)} files to update mobile navbar')
