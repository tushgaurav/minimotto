import json  # For pretty-printing
import requests
import xmltodict

url = "http://localhost:8000/jackett/?q=taylor+swift"

response = requests.get(url)

data = xmltodict.parse(response.content)

channel = data["rss"]["channel"]

items_raw = channel.get('item', [])
if not isinstance(items_raw, list):
    items_raw = [items_raw]

items = []
for item in items_raw:
    attrs = {}
    torznab_attrs = item.get('torznab:attr', [])
    if not isinstance(torznab_attrs, list):
        torznab_attrs = [torznab_attrs]
    for attr in torznab_attrs:
        name = attr.get('@name')
        value = attr.get('@value')
        if name in attrs:
            if not isinstance(attrs[name], list):
                attrs[name] = [attrs[name]]
            attrs[name].append(value)
        else:
            attrs[name] = value

    cleaned_item = {
        'title': item.get('title'),
        'guid': item.get('guid'),
        'pubDate': item.get('pubDate'),
        'size': item.get('size'),
        'files': item.get('files'),
        'description': item.get('description'),
        'magnetLink': item.get('link'),
        'category': item.get('category') if isinstance(item.get('category'), list) else [item.get('category')],
        'comments': item.get('comments'),
        'type': item.get('type'),
        'jackettindexer': item.get('jackettindexer'),  # Includes @id
        'enclosure': item.get('enclosure'),  # Dict with @url, @length, @type
        'attrs': attrs  # Flattened torznab attrs (seeders, peers, imdb, etc.)
    }
    items.append(cleaned_item)


with open('items.json', 'w', encoding='utf-8') as f:
    json.dump(items, f, indent=4, ensure_ascii=False)
