import sys

content = open('index.html', 'r', encoding='utf-8').read()
start = content.find('<div class="fixed bottom-0')
if start != -1:
    end = content.find('</div></div><div class="fixed bottom-20', start)
    if end == -1: end = content.find('</div>\n</div>\n<div class="fixed bottom-20', start)
    if end == -1: end = content.find('</nav>', start)
    nav_content = content[start:end]
    print(nav_content)
