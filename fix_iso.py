import os
import re

html_files = [os.path.join(r, f) for r, d, files in os.walk('.') for f in files if f.endswith('.html') and 'node_modules' not in r]

for fpath in html_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove schema credential
    content = re.sub(r'\"hasCredential\":\{[^\}]+\},?', '', content)
    
    # Remove from about.html
    content = content.replace('ISO 14001:2015, and ISO 45001:2018 certifications', 'highest industry standards')
    content = content.replace('ISO 9001:2015, ISO', 'highest quality standards')
    content = content.replace('We are accredited with highest quality standards', 'We adhere to the highest quality standards')
    content = content.replace('As an organization accredited with highest quality standards', 'As an organization adhering to the highest quality standards')
    
    content = content.replace('Achievements &amp; Certifications', 'Key Achievements')
    content = content.replace('Achievements and Certifications', 'Key Achievements')
    content = content.replace('ISO 9001:2015 Certified', 'Trusted Environmental Consultant')
    
    # index.html adjustments
    content = content.replace('Environmental Testing & Certification', 'Environmental Testing')
    content = content.replace('providing necessary certifications.', 'providing comprehensive testing reports.')
    content = content.replace('Training & Certification', 'Professional Training')
    content = content.replace('training programs and certifications on', 'training programs on')
    
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)

print(f'Cleaned up ISO and Certifications text in {len(html_files)} files')
