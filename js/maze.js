
// Params
var roadSize = {width:64, height:64};

// Maze (get from server later)
var mazeSize = {width:20, height:20};

var mazePattern = Array(
	[14,14,12,14,14,12,14,14,14,14,12,12,14,14,14,14,12,12,14,14],
	[10,11, 9, 1, 6, 2, 4, 4, 1,11, 0, 9, 4, 1, 4, 4, 3, 9, 4,11],
	[10, 4, 4, 6,13, 0, 0, 9, 1, 1, 5, 4, 3,12,13, 9, 8,12, 0,14],
	[10, 8, 9, 3,14, 9, 8, 7, 4,11,14, 9, 3, 0, 7, 1, 4, 8,13,14],
	[14,10, 6, 2, 4, 1,11,13, 9, 1, 1, 4, 5, 8, 0,10, 5, 4, 4,11],
	[10, 6,13, 2, 5, 4, 4, 4, 4, 4,11, 2, 6, 7, 8,10, 1, 8, 0,14],
	[10, 5, 6,13,12,13, 9, 3, 9, 3,14, 9, 3,13,10, 1, 6,14, 9,11],
	[14,14, 9, 6, 9, 4, 6,13,12, 9, 4, 1, 3, 7, 4, 4, 3,10, 4,11],
	[10, 1, 6, 2, 4, 8, 9,11, 2, 6, 9, 4, 3, 0, 0, 0, 9, 1, 8,14],
	[10, 6,13, 9, 5, 1, 4, 4, 5, 3, 7, 3, 9, 3, 9, 3,14, 7, 4,11],
	[14, 2, 4, 4, 1,11,13, 2, 1, 5, 3, 0,10, 5,11, 0,12, 2, 3,14],
	[14, 2, 8, 2,11,10, 4, 5, 1, 1, 3,13,12,12,12, 2, 5, 3, 9,11],
	[14, 2,11, 2, 1, 4, 8, 7, 6,14, 2, 4, 5, 5, 3, 0,10, 3,12,14],
	[14, 0, 7, 8,14, 0,12, 2, 8, 7, 5, 3,12,12,13, 9, 6, 9, 5,11],
	[14, 2, 5, 1, 4, 8, 2, 5, 6, 9, 1, 3, 0, 0, 7, 1, 8,12,12,14],
	[10, 8,12,12, 0, 7, 3,12, 9, 6,10, 3, 9, 3, 9,11, 7, 8, 9,11],
	[14, 7, 5, 8, 2, 5, 3, 9, 6,13, 7, 5, 6,13,12,10, 3, 7, 1,11],
	[14, 2, 1, 1, 8, 7, 8, 7, 5,11, 2,11, 2, 4, 3, 7, 8, 9, 6,14],
	[10, 8,12,12,12, 2, 6, 9, 6,14, 2,11, 2, 5, 3, 9, 4, 6, 0,14],
	[14,14,13,13,13,13,13,14,13,14,13,14,13,14,13,14,13,13,13,14]
);
var mazeData = Array(	// data collisions
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	[1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
	[1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0],
	[0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
	[1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
	[0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1],
	[1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1],
	[1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1],
	[1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
	[0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1],
	[1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1],
	[0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
	[1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0],
	[1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
	[1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
	[0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
	[1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
	[1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
	[1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
	[1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1],
	[0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
	[1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0],
	[1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1],
	[1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
	[0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1],
	[1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0],
	[1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1],
	[1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1],
	[0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
	[1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
	[1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1],
	[1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0],
	[1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1],
	[1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
	[0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1],
	[1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1],
	[0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
);

var mazeDrawingOffset = {
	x:-(mazeSize.width*roadSize.width-roadSize.width)/4-roadSize.width/4,
	y:(mazeSize.height*roadSize.height-roadSize.height)/4-roadSize.height/4
};

// Character images
var characterImageFilenames = Array("character_north.png", "character_south.png", "character_east.png", "character_west.png");
var characterImages = Array();
for(var i=0; i<characterImageFilenames.length; i++) {
	characterImages[i] = new Image();
	characterImages[i].src = "img/"+characterImageFilenames[i];
}

// Wall images
var wallImageFilenames = Array("northSouth.png", "westEast.png",	//  0  1
	"northSouthDeadEnd.png", "northSouthDeadStart.png",				//  2  3
	"westEastDeadEnd.png", "westEastDeadStart.png",					//  4  5
	"cornerSouthEast.png", "cornerNorthEast.png", 					//  6  7
	"cornerSouthWest.png", "cornerNorthWest.png", 					//  8  9
	"westEastIntersectSouth.png", "westEastIntersectNorth.png",		// 10 11
	"northSouthIntersectWest.png", "northSouthIntersectEast.png",	// 12 13
	"cross.png", "blank.png");										// 14 15
var wallImages = Array();
for(var i=0; i<wallImageFilenames.length; i++) {
	wallImages[i] = new Image();
	wallImages[i].src = "img/"+wallImageFilenames[i];
}

// Game objects
var character = {x:190, y:60};

$(document).ready(function() {
	// Get environment
	var mazeCanvas = document.getElementById("maze");
	var characterCanvas = document.getElementById("character");
	
	// Set canvas size (depending road size and maze size)
	mazeCanvas.setAttribute("width", roadSize.width*mazeSize.width/2);
	mazeCanvas.setAttribute("height", roadSize.height*mazeSize.height/2);
	mazeCanvas.style.marginLeft = (-mazeCanvas.width/2)+"px";

	characterCanvas.setAttribute("width", mazeCanvas.width);
	characterCanvas.setAttribute("height", mazeCanvas.height);
	characterCanvas.style.marginLeft = (-mazeCanvas.width/2)+"px";

	// Get contexts
	var mazeContext = mazeCanvas.getContext("2d");
	var characterContext = characterCanvas.getContext("2d");
	
	// Draw maze !
	drawMaze(mazeContext);
	
	// Draw character !
	drawCharacter(characterContext, character.x, character.y);
});

function drawMaze(mazeContext) {
	// Draw walls
	for(var y=0; y<mazeSize.height; y++) {
		for(var x=0; x<mazeSize.width; x++) {
			drawWall(mazeContext, x, y);
		}
	}
}

function drawCharacter(characterContext, x, y) {
	// Draw character at (x,y)
	characterContext.drawImage(characterImages[2], character.x, character.y);
}

function drawWall(context, x, y) {
	// draw Wall (x,y)
	context.drawImage(wallImages[mazePattern[y][x]],
		(x+y)*roadSize.width/2+mazeDrawingOffset.x,
		(y-x)*roadSize.height/2+mazeDrawingOffset.y);
}

function clearCharacters(context) {
	// Clear all characters
	context.clearRect(0,0,mazeSize.width, mazeSize.height);
}
