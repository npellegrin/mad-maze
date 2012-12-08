#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

# coords
sprites = [
	{ 'name': 'south', 'x':0, 'y':0 },
	{ 'name': 'north', 'x':32, 'y':0 },
	{ 'name': 'east', 'x':0, 'y':32 },
	{ 'name': 'west', 'x':32, 'y':32 }
]

# const
svg_path = 'character.svg'
width = 32
height = 32

# generate
for image in sprites:
	x = image['x']
	y = image['y']
	png_path = os.path.join("character_%s.png" % image['name'])
	os.system("inkscape -z --file %s --export-png %s --export-area %i:%i:%i:%i --export-width %i --export-height %i" % (svg_path, png_path, x, y, x+width, y+height, width, height))
