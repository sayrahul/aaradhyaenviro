
import os
import glob
import re

def rename_and_update():
    base_dir = r"d:\My Web Sites\Gurukrupa 2\temp_repo_push"
    
    # Define renaming map
    rename_map = {
        "fire-systems.html": "wastewater-systems.html",
        "extinguishers.html": "environmental-consultation.html",
        "fire-systems": "wastewater-systems",
        "extinguishers": "environmental-consultation"
    }
    
    # 1. Update links in all HTML files
    html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)
    for html_file in html_files:
        with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        updated_content = content
        for old, new in rename_map.items():
            # Replace links like href="./fire-systems.html" or href="fire-systems.html"
            updated_content = updated_content.replace(f'="./{old}"', f'="./{new}"')
            updated_content = updated_content.replace(f'="/{old}"', f'="/{new}"')
            updated_content = updated_content.replace(f'href="{old}"', f'href="{new}"')
            
            # Replace folder paths in links or images
            updated_content = updated_content.replace(f'/{old}/', f'/{new}/')
            updated_content = updated_content.replace(f'="./{old}/', f'="./{new}/')
        
        if updated_content != content:
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            print(f"Updated links in {html_file}")

    # 2. Rename the files and folders
    for old, new in rename_map.items():
        old_path = os.path.join(base_dir, old)
        new_path = os.path.join(base_dir, new)
        if os.path.exists(old_path):
            try:
                os.rename(old_path, new_path)
                print(f"Renamed {old} to {new}")
            except Exception as e:
                print(f"Error renaming {old}: {e}")

if __name__ == "__main__":
    rename_and_update()
