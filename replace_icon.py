import re

with open('contact.html', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to replace the drop SVG next to "Contact Us" with a leaf SVG
# The exact drop SVG is:
drop_svg_pattern = r'<svg class="text-3xl md:text-4xl text-yellow-400" fill="currentColor" height="1em" stroke="currentColor" stroke-width="0" viewbox="0 0 384 512" width="1em" xmlns="http://www.w3.org/2000/svg">\s*<path d="M216 23\.86.*?"></path>\s*</svg>'

leaf_svg = '''<svg class="text-3xl md:text-4xl text-yellow-400" fill="currentColor" height="1em" stroke="currentColor" stroke-width="0" viewBox="0 0 512 512" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M537.9 222.1c28.3-71.1 25.9-152.2-21.6-200-47.5-47.8-128-50.5-199-22-83.3 33.4-142.3 111-149.6 200.7-57.8 74.6-70.3 185.3-25.7 274l-95.2 95.3c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l94.8-94.8c89 44.9 200 32.5 274.6-25.5 91.5-8.5 170.8-68 205.2-152zM288 416c-37.1 0-72.2-12.1-100.8-33l179.9-179.9c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L141.9 337.8c-20.9-28.7-33-63.7-33-100.8 0-82.6 57.5-152 135-167.3 15-3 30.3-4.5 45.9-4.5 97.2 0 176 78.8 176 176 0 15.6-1.5 30.9-4.5 45.9-15.3 77.5-84.7 135-167.3 135z"></path>
         </svg>'''

new_content = re.sub(drop_svg_pattern, leaf_svg, content, flags=re.DOTALL)

if new_content != content:
    with open('contact.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Replaced drop with leaf icon successfully!")
else:
    print("Could not find the SVG to replace.")
