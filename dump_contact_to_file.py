content = open('contact.html', 'r', encoding='utf-8').read()
start = content.find('<div class="fixed bottom-0')
if start != -1:
    end = content.find('</div></div><div class="fixed bottom-20', start)
    if end == -1: end = content.find('</div>\n</div>\n<div class="fixed bottom-20', start)
    if end == -1: end = content.find('</nav>', start)
    if end == -1: end = start + 4000
    nav = content[start:end]
    with open('contact_nav.txt', 'w') as f:
        f.write(nav)
