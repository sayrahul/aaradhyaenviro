
import os
import glob

# Specific updates for extinguishers.html and fire-systems.html
def update_specific_pages():
    pages = {
        r"d:\My Web Sites\Gurukrupa 2\website_full\www.gurukrupafireservices.com\extinguishers.html": {
            "<title>Environmental Consultations in Sambhajinagar (Aurangabad) | All Types - ABC, CO2, Foam, Water | Aaradhya Enviro</title>": "<title>Environmental Consultancy Services | Aaradhya Enviro Sambhajinagar</title>",
            "<h1>Professional Environmental Consultations</h1>": "<h1>Professional Environmental Consultancy</h1>",
            "ISI marked environmental consultations": "certified environmental consultancy and audits",
            "Choose the Right Environmental Consultation": "Choose the Right Consultancy Service",
            "ABC Dry powder": "Phase I Assessment",
            "CO2 (Carbon Dioxide)": "Impact Assessment",
            "Water Environmental Consultation": "Water Quality Audit",
            "extinguisher": "consultation",
            "Extinguisher": "Consultation",
            "fire risks": "environmental risks",
            "fire safety needs": "compliance needs",
        },
        r"d:\My Web Sites\Gurukrupa 2\website_full\www.gurukrupafireservices.com\fire-systems.html": {
            "<title>Fire Protection Systems": "<title>Wastewater & Environmental Systems",
            "<h1>Fire Protection Systems</h1>": "<h1>Wastewater & Environmental Systems</h1>",
            "fire protection systems": "wastewater treatment systems",
            "Sprinkler System": "STP Treatment System",
            "Fire Alarm System": "Monitoring System",
            "Fire Hydrant System": "Effluent Treatment (ETP)",
            "Fire Separation System": "Environmental Audits",
            "Fire Suppression System": "Sludge Management",
            "fire safety solutions": "wastewater solutions",
            "protect lives, property": "protect environment, ensure compliance",
        }
    }

    for path, reps in pages.items():
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            for old, new in reps.items():
                content = content.replace(old, new)
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated specific content for {os.path.basename(path)}")

# Global updates for all HTML files
def update_global_elements():
    html_files = glob.glob(r"d:\My Web Sites\Gurukrupa 2\website_full\www.gurukrupafireservices.com\**\*.html", recursive=True)
    
    global_reps = {
        # Contact info
        "href=\"tel:+919503960395\" class=\"hover:underline\">(+91) 95039-60395</a> | <a href=\"tel:+919075032007\" class=\"hover:underline\">90750-32007</a>": "href=\"tel:+919975929212\" class=\"hover:underline\">(+91) 99759-29212</a>",
        "href=\"tel:+919503960395\" class=\"block text-white hover:text-orange-500 transition-colors duration-200 text-sm\">+91 95039 60395</a><a href=\"tel:+919075032007\"": "href=\"tel:+919975929212\" class=\"block text-white hover:text-orange-500 transition-colors duration-200 text-sm\">+91 99759 29212</a><a href=\"tel:+919975929212\"",
        "10, Wadgaon Kolhati, Chhatrapati Sambhajinagar</span>": "10, Wadgaon Kolhati, Chhatrapati Sambhajinagar, Maharashtra 431136</span>",
        "Mon-Sat: 9AM-6PM": "Mon-Sat: 9AM-7PM",
        
        # Navigation / Footer Menu Labels
        ">Fire Safety<": ">Consultancy<",
        "Environmental Consultations</a>": "Environmental Consultation</a>",
        'href="./fire-systems.html">Fire Systems</a>': 'href="./fire-systems.html">Wastewater Systems</a>',
        "Fire Audit &amp; AMC": "Environmental Audit",
        "Passive Protection": "Compliance Support",
        "Nucleonic Material": "Waste Management",
        
        # Company Name Cleanup (Gurukrupa to Aaradhya if missed)
        "Gurukrupa Fire": "Aaradhya Enviro",
        "www.gurukrupafireservices.com": "www.aaradhyaenviro.com",
    }

    for path in html_files:
        try:
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            changed = False
            for old, new in global_reps.items():
                if old in content:
                    content = content.replace(old, new)
                    changed = True
            
            # Additional JSON-LD cleanup if missed
            if '"telephone":"+91-9503960395"' in content:
                content = content.replace('"telephone":"+91-9503960395"', '"telephone":"+91-9975929212"')
                changed = True
            if '"postalCode":"431001"' in content:
                content = content.replace('"postalCode":"431001"', '"postalCode":"431136"')
                changed = True
            
            if changed:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Applied global updates to {os.path.relpath(path, r'd:\My Web Sites\Gurukrupa 2\website_full\www.gurukrupafireservices.com')}")
        except Exception as e:
            print(f"Error processing {path}: {e}")

if __name__ == "__main__":
    update_specific_pages()
    update_global_elements()
