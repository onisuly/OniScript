#!/usr/bin/env python3
import requests
import json
import os
import pathlib
import errno
import urllib.parse as urlparse
from urllib.parse import parse_qs

BING_URI_BASE = "http://www.bing.com"
BING_WALLPAPER_PATH = "/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US"
WALLPAPER_PATH = os.path.join(os.environ.get('HOME'), "Pictures/Bing Wallpapers")

resp = requests.get(BING_URI_BASE + BING_WALLPAPER_PATH)

if resp.status_code == 200:
    json_response = json.loads(resp.content)
    wallpaper_path = json_response['images'][0]['url']
    parsed = urlparse.urlparse(wallpaper_path.split('/')[-1])
    filename = parse_qs(parsed.query)['id'][0]
    wallpaper_uri = BING_URI_BASE + wallpaper_path

    if not os.path.exists(WALLPAPER_PATH):
        try:
            os.makedirs(WALLPAPER_PATH)
        except OSError as exc:
            if exc.errno != errno.EEXIST:
                raise

    response = requests.get(wallpaper_uri)
    wallpaper_file = os.path.join(WALLPAPER_PATH, filename)
    if resp.status_code == 200:
        with open(wallpaper_file, 'wb') as f:
            f.write(response.content)
            os.system("gsettings set org.gnome.desktop.background picture-uri " + pathlib.Path(wallpaper_file).as_uri())
    else:
        raise ValueError("[ERROR] non-200 response from Bing server for '{}'".format(wallpaper_uri))
else:
    raise ValueError("[ERROR] non-200 response from Bing server for '{}'".format(BING_URI_BASE + BING_WALLPAPER_PATH))
