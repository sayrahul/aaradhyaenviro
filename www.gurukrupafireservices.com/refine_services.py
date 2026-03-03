
import os
import glob

def update_service_pages():
    service_dir = r"d:\My Web Sites\Gurukrupa 2\website_full\www.gurukrupafireservices.com\services"
    html_files = glob.glob(os.path.join(service_dir, "*.html"))
    
    # Mapping of service filename (or content matches) to environmental counterparts
    mappings = {
        "fire-alarm-detection": ("Environmental Monitoring", "Advanced sensing and monitoring systems for environmental parameters."),
        "fire-hydrant-system": ("Water Supply Systems", "Industrial water supply and distribution infrastructure for facilities."),
        "fire-suppression-system": ("Wastewater Treatment", "Specialized systems for effluent and sewage treatment plants."),
        "sprinkler-systems": ("Water Treatment Systems", "Automatic water distribution and treatment for industrial safety."),
        "fire-tenders": ("Mobile Response Units", "Specialized vehicles for environmental response and water management."),
        "fire-extinguishers": ("Environmental Consulting", "Professional environmental audits, reports, and consultancy services."),
        "fire-audit-consultancy": ("Environmental Audit", "Comprehensive audits to ensure environmental compliance and safety."),
        "passive-fire-protection": ("Compliance Support", "Passive systems and advisory to ensure total environmental compliance."),
        "nucleonic-material": ("Waste Management", "Safe handling and management of specialized waste materials."),
        "system-design-drawing": ("STP/ETP System Design", "Engineering and design of wastewater treatment plants (STP/ETP)."),
        "annual-maintenance": ("AMC for STP/ETP", "Annual Maintenance Contracts for wastewater treatment and environmental systems."),
        "engineering-services-consultancy": ("Engineering Consultancy", "Expert engineering services for environmental and water infrastructure."),
        "system-integrator": ("IoT Environmental Solutions", "Integration of IoT and smart systems for environmental monitoring."),
        "industrial-pumps": ("Industrial Treatment Pumps", "Heavy-duty pumps for wastewater treatment and industrial applications."),
        "detector-systems": ("Sensor & Detector Systems", "Advanced sensors for gas, smoke, and environmental contaminants.")
    }

    for path in html_files:
        filename = os.path.basename(path).replace(".html", "")
        if filename in mappings:
            new_title, new_desc = mappings[filename]
            
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Update H1 (assuming it's in the hero section)
            # Find the H1 tag and replace it
            import re
            content = re.sub(r'<h1[^>]*>.*?</h1>', f'<h1>{new_title}</h1>', content, flags=re.IGNORECASE)
            
            # Update Title
            content = re.sub(r'<title>.*?</title>', f'<title>{new_title} | Aaradhya Enviro</title>', content, flags=re.IGNORECASE)
            
            # Update common terms
            terms = {
                "Fire Safety": "Environmental Consultancy",
                "fire safety": "environmental consultancy",
                "Fire Protection": "Environmental & Wastewater",
                "fire protection": "environmental & wastewater",
                "FireFighting": "WastewaterTreatment",
                "firefighting": "wastewater treatment",
                "Fire Audit": "Environmental Audit",
                "fire audit": "environmental audit",
                "fire extinguishers": "environmental consultations",
            }
            
            for old, new in terms.items():
                content = content.replace(old, new)
                
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Refined content for service page: {filename}")

if __name__ == "__main__":
    update_service_pages()
