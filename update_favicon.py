import os
import re

for root, _, files in os.walk('.'):
    for f in files:
        if f.endswith('.html'):
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Use regex to replace href inside link rel='icon' specifically
            depth = filepath.count(os.sep) - 1
            if depth == 0:
                rel_path = './favicon.ico'
                rel_type = 'image/x-icon'
            else:
                rel_path = ('../' * depth) + 'favicon.ico'
                rel_type = 'image/x-icon'
                
            new_content = re.sub(r'<link rel=\"icon\" href=\"[^\"]+\" type=\"[^\"]+\">', f'<link rel=\"icon\" href=\"{rel_path}\" type=\"{rel_type}\">', content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                print(f'Updated {filepath}')
