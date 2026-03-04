import os

for root, _, files in os.walk('.'):
    for f in files:
        if f.endswith('.html'):
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Use depth properly
            depth = filepath.count(os.sep) - 1
            if depth == 0:
                rel_path = './favicon.ico'
            else:
                rel_path = ('../' * depth) + 'favicon.ico'
                
            content = content.replace('<link rel="icon" href="./favicon.png" type="image/png">', f'<link rel="icon" href="{rel_path}" type="image/x-icon">')
            content = content.replace('<link rel="icon" href="../favicon.png" type="image/png">', f'<link rel="icon" href="{rel_path}" type="image/x-icon">')
            
            with open(filepath, 'w', encoding='utf-8') as file:
                file.write(content)
            print(f'Updated {filepath}')
