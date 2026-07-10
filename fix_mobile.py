import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

pattern1 = r'<div class="lg:hidden">\s*<div class="overflow-x-auto.*?</div>\s*</div>\s*</div>\s*<div class="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">'
replacement1 = '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">'
new_html, count1 = re.subn(pattern1, replacement1, html, flags=re.DOTALL)
print(f'Replaced What We Offer: {count1}')

pattern2 = r'<div class="lg:hidden">\s*<div class="overflow-x-auto.*?</div>\s*</div>\s*</div>\s*<div class="hidden lg:grid lg:grid-cols-4 gap-6 sm:gap-8">'
replacement2 = '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">'
new_html, count2 = re.subn(pattern2, replacement2, new_html, flags=re.DOTALL)
print(f'Replaced Our Achievements: {count2}')

if count1 == 1 and count2 == 1:
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print('Successfully updated index.html')
else:
    print('Failed to replace both chunks.')
