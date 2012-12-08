#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

# coords
sprites = [
	{ 'name': 'northSouth', 'x':64, 'y':256 },
	{ 'name': 'westEast', 'x':256, 'y':192 },
	{ 'name': 'northSouthDeadEnd', 'x':128, 'y':320 },
	{ 'name': 'northSouthDeadStart', 'x':0, 'y':192 },
	{ 'name': 'westEastDeadEnd', 'x':320, 'y':128 },
	{ 'name': 'westEastDeadStart', 'x':192, 'y':256 },
	{ 'name': 'cornerNorthWest', 'x':128, 'y':256 },
	{ 'name': 'cornerSouthWest', 'x':0, 'y':128 },
	{ 'name': 'cornerNorthEast', 'x':256, 'y':128 },
	{ 'name': 'cornerSouthEast', 'x':128, 'y':0 },
	{ 'name': 'westEastIntersectSouth', 'x':192, 'y':192 },
	{ 'name': 'westEastIntersectNorth', 'x':64, 'y':64 },
	{ 'name': 'northSouthIntersectEast', 'x':64, 'y':192 },
	{ 'name': 'northSouthIntersectWest', 'x':192, 'y':64 },
	{ 'name': 'cross', 'x':128, 'y':128 },
	{ 'name': 'blank', 'x':0, 'y':0 }
]

# const
svg_path = 'walls.svg'
width = 64
height = 64

# generate
for image in sprites:
	x = image['x']
	y = image['y']
	png_path = os.path.join("%s.png" % image['name'])
	os.system("inkscape -z --file %s --export-png %s --export-area %i:%i:%i:%i --export-width %i --export-height %i" % (svg_path, png_path, x, y, x+width, y+height, width, height))
