content = open('contact.html', 'r', encoding='utf-8').read()
start = content.find('<div class="fixed bottom-0 left-0 right-0')
if start != -1:
    print(content[start:start+2000])
