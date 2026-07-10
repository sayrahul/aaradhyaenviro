import re

# Get correct navbar from index.html
content_index = open('index.html', 'r', encoding='utf-8').read()
start_index = content_index.find('<div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden')
end_index = content_index.find('</div></div><div class="fixed bottom-20', start_index)
nav_index = content_index[start_index:end_index] + '</div></div>'

# Strip active state from Home in the copied nav
nav_index = nav_index.replace('text-teal-600 bg-teal-50 shadow-sm', 'text-gray-600 hover:text-teal-600 hover:bg-teal-50')
indicator_html = '<div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-teal-600 rounded-t-full"></div>'
nav_index = nav_index.replace(indicator_html, '')
nav_index = nav_index.replace('class="text-lg mb-1 text-teal-600"', 'class="text-lg mb-1 text-gray-600"')
nav_index = nav_index.replace('class="text-xs font-medium leading-tight text-center text-teal-600"', 'class="text-xs font-medium leading-tight text-center text-gray-600"')

# Add active state to Contact
contact_a_start = nav_index.find('href="contact.html"')
a_start = nav_index.rfind('<a ', 0, contact_a_start)
a_end = nav_index.find('</a>', contact_a_start) + 4
contact_a = nav_index[a_start:a_end]

new_contact_a = contact_a.replace('text-gray-600 hover:text-teal-600 hover:bg-teal-50', 'text-teal-600 bg-teal-50 shadow-sm')
new_contact_a = new_contact_a.replace('class="text-lg mb-1 text-gray-600"', 'class="text-lg mb-1 text-teal-600"')
new_contact_a = new_contact_a.replace('class="text-xs font-medium leading-tight text-center text-gray-600"', 'class="text-xs font-medium leading-tight text-center text-teal-600"')
new_contact_a = new_contact_a.replace('</a>', indicator_html + '</a>')

nav_index = nav_index.replace(contact_a, new_contact_a)

# Now inject it into contact.html
content_contact = open('contact.html', 'r', encoding='utf-8').read()
start_contact = content_contact.find('<div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden')

# Look for the end of the navbar in contact.html
# Let's use a regex to match the first <script> tag which appears after the navbar in contact.html
end_contact = content_contact.find('<script>', start_contact)
if end_contact != -1:
    # There might be some whitespace or closing tags before the <script>
    script_prev_content = content_contact[start_contact:end_contact]
    # Let's just find the last </div> before the <script>
    last_div = script_prev_content.rfind('</div>')
    
    # Actually, we know exactly what we are replacing.
    # The mobile navbar is the only thing between start_contact and the first <script>.
    # Oh wait! Are there desktop dropdown scripts? Yes.
    # So the navbar ends where?
    
    # Let's count divs from start_contact.
    div_count = 0
    idx = start_contact
    while idx < len(content_contact):
        if content_contact[idx:idx+4] == '<div':
            div_count += 1
            idx += 4
        elif content_contact[idx:idx+6] == '</div>':
            div_count -= 1
            idx += 6
            if div_count == 0:
                end_contact = idx
                break
        else:
            idx += 1
            
    if div_count == 0:
        content_contact = content_contact[:start_contact] + nav_index + content_contact[end_contact:]
        with open('contact.html', 'w', encoding='utf-8') as f:
            f.write(content_contact)
        print('Successfully replaced contact.html navbar')
    else:
        print('Failed to balance divs')
else:
    print('Failed to find end in contact.html')
