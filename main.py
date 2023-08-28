#!/usr/bin/env python
import json
import os

fs = []

files = os.listdir('js')

for file in files:
    if file == "template.js":continue
    if not file.endswith('.js'):continue
    print(f"reading {file} and adding to main code")
    with open(f'js/{file}') as f:
        fs.append(f.read())
# Read ore data from JSON file
with open("ore_data.json") as file:
    ore_data = json.load(file)

with open('js/template.js') as f:
    js_template = f.read()

# Fill in the ore data in the JavaScript template
js_code = js_template.replace('[[data]]',json.dumps(ore_data))
js_code = js_code.replace('[[code]]','\n'.join(fs))
js_code = js_code + f'\ndocument.title = \"{input("name of this game ")}\"'



# Write the compiled JavaScript code to a file
with open(input('file name(filename.js) '), "w") as js_file:
    js_file.write(js_code)

print("JavaScript game script generated.")
