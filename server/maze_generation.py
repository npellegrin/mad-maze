#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import math
import random

# Orientation enum
class Orientation:
	LEFT = 0
	RIGHT = 1
	TOP = 2
	BOTTOM = 3

# Cell data structure
class Cell:
	def __init__(self):
		self.visited = False
		self.walls = [None, None, None, None]

# Wall data structure
class Wall:
	def __init__(self):
		self.firstCell = None
		self.lastCell = None
		self.broken = False

# Base params
# Generated maze will have a size of mazeWidth+1 X mazeHeight+1
mazeWidth = 19
mazeHeight = 19

# Startpoint (center)
startPointX = int(math.floor(mazeWidth/2))
startPointY = int(math.floor(mazeHeight/2))

# Create maze structure
maze = [[Cell() for i in range(mazeHeight)] for j in range(mazeWidth)]

# Connect walls
for y in range(0, mazeHeight):
	for x in range(0, mazeWidth):
		if x-1 >= 0:
			if maze[x-1][y].walls[Orientation.RIGHT] != None:
				maze[x][y].walls[Orientation.LEFT] = maze[x-1][y].walls[Orientation.RIGHT]
			else:
				maze[x][y].walls[Orientation.LEFT] = Wall()
				maze[x][y].walls[Orientation.LEFT].firstCell = maze[x][y]
				maze[x][y].walls[Orientation.LEFT].lastCell = maze[x-1][y]
		if x+1 < mazeWidth:
			if maze[x+1][y].walls[Orientation.LEFT] != None:
				maze[x][y].walls[Orientation.RIGHT] = maze[x+1][y].walls[Orientation.LEFT]
			else:
				maze[x][y].walls[Orientation.RIGHT] = Wall()
				maze[x][y].walls[Orientation.RIGHT].firstCell = maze[x][y]
				maze[x][y].walls[Orientation.RIGHT].lastCell = maze[x+1][y]
		if y-1 >= 0:
			if maze[x][y-1].walls[Orientation.BOTTOM] != None:
				maze[x][y].walls[Orientation.TOP] = maze[x][y-1].walls[Orientation.BOTTOM]
			else:
				maze[x][y].walls[Orientation.TOP] = Wall()
				maze[x][y].walls[Orientation.TOP].firstCell = maze[x][y]
				maze[x][y].walls[Orientation.TOP].lastCell = maze[x][y-1]
		if y+1 < mazeHeight:
			if maze[x][y+1].walls[Orientation.TOP] != None:
				maze[x][y].walls[Orientation.BOTTOM] = maze[x][y+1].walls[Orientation.TOP]
			else:
				maze[x][y].walls[Orientation.BOTTOM] = Wall()
				maze[x][y].walls[Orientation.BOTTOM].firstCell = maze[x][y]
				maze[x][y].walls[Orientation.BOTTOM].lastCell = maze[x][y+1]

# =====================================
# = Build Maze using Prim's algorithm =
# =====================================

# Start algorithm
wallList = []
currentCell = maze[startPointX][startPointY]
currentCell.visited = True
wallList.extend(currentCell.walls)

# Iterate
while len(wallList) != 0:
	# Pick a wall randomly in wall list
	currentWall = random.choice(wallList)
	currentCell = None
	
	if currentWall != None:
		# If cell on the opposite of the wall isn't in the maze
		if currentWall.firstCell != None and not(currentWall.firstCell.visited):
			currentCell = currentWall.firstCell
		elif currentWall.lastCell != None and not(currentWall.lastCell.visited):
			currentCell = currentWall.lastCell
		
		if currentCell != None:
			# break the wall, and mark it as part of the maze
			currentWall.broken = True
			currentCell.visited = True
			# Add the walls of the new cell to the wall list
			wallList.extend(currentCell.walls)
		else:
			# If all cells are already in the maze, remove the wall to wall list
			wallList.remove(currentWall)
	else:
		# If there is no wall, skip it
		wallList.remove(currentWall)

# =============================
# = Transform maze to pattern =
# =============================

# Pattern map
pattern = [0 for i in range(16)]
pattern[0] = {'left':True, 'right':True, 'top':False ,'bottom':False}
pattern[1] = {'left':False, 'right':False, 'top':True ,'bottom':True}
pattern[2] = {'left':True, 'right':False, 'top':False ,'bottom':False}
pattern[3] = {'left':False, 'right':True, 'top':False ,'bottom':False}
pattern[4] = {'left':False, 'right':False, 'top':True ,'bottom':False}
pattern[5] = {'left':False, 'right':False, 'top':False ,'bottom':True}
pattern[6] = {'left':False, 'right':True, 'top':True ,'bottom':False}
pattern[7] = {'left':True, 'right':False, 'top':True ,'bottom':False}
pattern[8] = {'left':False, 'right':True, 'top':False ,'bottom':True}
pattern[9] = {'left':True, 'right':False, 'top':False ,'bottom':True}
pattern[10] = {'left':True, 'right':False, 'top':True ,'bottom':True}
pattern[11] = {'left':False, 'right':True, 'top':True ,'bottom':True}
pattern[12] = {'left':True, 'right':True, 'top':True ,'bottom':False}
pattern[13] = {'left':True, 'right':True, 'top':False ,'bottom':True}
pattern[14] = {'left':True, 'right':True, 'top':True ,'bottom':True}
pattern[15] = {'left':False, 'right':False, 'top':False ,'bottom':False}

# Transform
mazePattern = [[15 for i in range(mazeHeight+1)] for j in range(mazeWidth+1)]
for y in range(0, mazeHeight+1):
	for x in range(0, mazeWidth+1):
		# Init borders
		left = True
		right = True
		top = True
		bottom = True

		# Get borders
		if x< mazeWidth and y <mazeHeight:
			if maze[x][y].walls[Orientation.LEFT] != None:
				bottom = not(maze[x][y].walls[Orientation.LEFT].broken)
			if maze[x][y].walls[Orientation.TOP] != None:
				right = not(maze[x][y].walls[Orientation.TOP].broken)
		if x-1>=0 and y-1>=0:
			if maze[x-1][y-1].walls[Orientation.RIGHT] != None:
				top = not(maze[x-1][y-1].walls[Orientation.RIGHT].broken)
			if maze[x-1][y-1].walls[Orientation.BOTTOM] != None:
				left = not(maze[x-1][y-1].walls[Orientation.BOTTOM].broken)

		# Find corresponding pattern
		for i in range(0, len(pattern)):
			if pattern[i]['left'] == left and pattern[i]['right'] == right and pattern[i]['top'] == top and pattern[i]['bottom'] == bottom:
				mazePattern[x][y] = i
				break

# Show visual maze
print "- Visual maze -"
for y in range(0, mazeHeight):
	# Display top walls
	for x in range(0, mazeWidth):
		# Junction between left wall and top wall: always a X
		sys.stdout.write("XX")
		# Top wall
		if maze[x][y].walls[Orientation.TOP] != None and maze[x][y].walls[Orientation.TOP].broken:
			sys.stdout.write("  ")
		else:
			sys.stdout.write("XX")
	# Junction between right wall and last top wall: always a X
	sys.stdout.write("XX")
	sys.stdout.write("\n")

	# Display left walls
	for x in range(0, mazeWidth):
		# Left wall
		if maze[x][y].walls[Orientation.LEFT] != None and maze[x][y].walls[Orientation.LEFT].broken:
			sys.stdout.write("  ")
		else:
			sys.stdout.write("XX")
		# Cell
		sys.stdout.write("  ")
	# Last wall of the line (on the right)
	if maze[mazeWidth-1][y].walls[Orientation.RIGHT] != None and maze[mazeWidth-1][y].walls[Orientation.RIGHT].broken:
		sys.stdout.write("  ")
	else:
		sys.stdout.write("XX")
	sys.stdout.write("\n")

# Last line (bottom walls)
for x in range(0, mazeWidth):
	# Junction between left wall and bottom wall: always a X
	sys.stdout.write("XX")
	# Bottom wall
	if maze[x][y].walls[Orientation.BOTTOM] != None and maze[x][y].walls[Orientation.BOTTOM].broken:
		sys.stdout.write("  ")
	else:
		sys.stdout.write("XX")

# Junction between right wall and last bottom wall: always a X
sys.stdout.write("XX")
sys.stdout.write("\n")

# Show Javascript code for maze data
print "- Maze data -"
for y in range(0, mazeHeight):
	# Display top walls
	for x in range(0, mazeWidth):
		# Format
		if x == 0:
			sys.stdout.write("\t[")
		# Junction between left wall and top wall: always a X
		sys.stdout.write("1, ")
		# Top wall
		if maze[x][y].walls[Orientation.TOP] != None and maze[x][y].walls[Orientation.TOP].broken:
			sys.stdout.write("0, ")
		else:
			sys.stdout.write("1, ")
	# Junction between right wall and last top wall: always a X
	sys.stdout.write("1],\n")

	# Display left walls
	for x in range(0, mazeWidth):
		# Format
		if x == 0:
			sys.stdout.write("\t[")
		# Left wall
		if maze[x][y].walls[Orientation.LEFT] != None and maze[x][y].walls[Orientation.LEFT].broken:
			sys.stdout.write("0, ")
		else:
			sys.stdout.write("1, ")
		# Cell
		sys.stdout.write("0, ")
	# Last wall of the line (on the right)
	if maze[mazeWidth-1][y].walls[Orientation.RIGHT] != None and maze[mazeWidth-1][y].walls[Orientation.RIGHT].broken:
		sys.stdout.write("0],\n")
	else:
		sys.stdout.write("1],\n")

# Last line (bottom walls)
for x in range(0, mazeWidth):
	# Format
	if x == 0:
		sys.stdout.write("\t[")
	# Junction between left wall and bottom wall: always a X
	sys.stdout.write("1, ")
	# Bottom wall
	if maze[x][y].walls[Orientation.BOTTOM] != None and maze[x][y].walls[Orientation.BOTTOM].broken:
		sys.stdout.write("0, ")
	else:
		sys.stdout.write("1, ")

# Junction between right wall and last bottom wall: always a X
sys.stdout.write("1]\n")

# Show Javascript code for pattern
print "- Javascript -"
for y in range(0, mazeHeight+1):
	sys.stdout.write("\t[")
	for x in range(0, mazeWidth+1):
		if x != mazeWidth:
			if mazePattern[x][y]<10:
				sys.stdout.write(" ")
			sys.stdout.write(str(mazePattern[x][y])+",")
		else:
			sys.stdout.write(str(mazePattern[x][y]))
	if y != mazeHeight:
		sys.stdout.write("],\n")
	else:
		sys.stdout.write("]\n")
