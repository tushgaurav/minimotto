def getItemsList(data):
    """
    Return a array of items from the data.

    Args:
        data (dict): xmltodict parsed RSS data from Jackett API

    Returns:
        list: A list of items.
    """
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
            'jackettindexer': {
                "id": item.get('jackettindexer').get('@id'),
                "name": item.get('jackettindexer').get('#text'),
            },  # Includes @id
            # Dict with @url, @length, @type
            'enclosure': item.get('enclosure'),
            # Flattened torznab attrs (seeders, peers, imdb, etc.)
            "seeders": attrs.get("seeders", 0),
            "peers": attrs.get("peers", 0),
            'attrs': attrs,
        }
        items.append(cleaned_item)

    return items
