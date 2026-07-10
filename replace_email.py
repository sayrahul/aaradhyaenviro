import os

# Walk through the directory to find HTML files
html_files = []
for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root:
        continue
    for file in files:
        if file.endswith('.html') or file.endswith('.js') or file.endswith('.css'):
            html_files.append(os.path.join(root, file))

count = 0
for fpath in html_files:
    try:
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if 'aaradhyaenviro07@gmail.com' in content:
            new_content = content.replace('aaradhyaenviro07@gmail.com', 'info@aaradhyaenviro.com')
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count += 1
            print(f'Updated {fpath}')
    except Exception as e:
        print(f'Error reading {fpath}: {e}')

print(f'Successfully updated email in {count} files.')
