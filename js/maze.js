
// Params
var roadSize = {width:64, height:64};

// Maze (get from server later)
var mazeSize = {width:20, height:20};
var mazePattern = Array(
	[15,15,15,15,15,15,15,15,15, 8,13,15,15,15,15,15,15,15,15,15],
	[15,15,15,15,15,15,15,15, 0,10, 1, 1,15,15,15,15,15,15,15,15],
	[15,15,15,15,15,15,15, 9, 8,10, 1,11,13,15,15,15,15,15,15,15],
	[15,15,15,15,15,15, 3, 7, 1, 1, 4, 1, 4, 8,15,15,15,15,15,15],
	[15,15,15,15,15, 0, 0, 0,10, 4, 8,12, 9, 1, 8,15,15,15,15,15],
	[15,15,15,15, 1, 5, 8, 0,14, 9, 1,15, 1, 1, 1, 5,15,15,15,15],
	[15,15,15,10, 1, 6, 7,15, 4, 4, 1, 8,12,10, 1, 6, 7,15,15,15],
	[15,15, 8, 7, 6, 0, 0, 2,15, 5, 4, 1, 8, 7, 6, 0, 0, 0,15,15],
	[15,10, 6, 0, 0, 0,13, 0, 2, 1, 8,10, 6, 0, 0, 0,13, 0, 2,15],
	[ 4, 6, 0, 0, 0, 0, 7, 3, 0, 7, 4, 6, 0, 0, 0, 0, 7, 3, 0, 7],
	[ 8,13,13,13, 0, 0, 0, 0, 2, 5, 8,13,13,13, 0, 0, 0, 0, 2, 5],
	[15, 1, 4,11, 9, 8, 0, 0, 0,10, 1, 1, 4,11, 9, 8, 0, 0, 0,15],
	[15,15,13, 7, 4,11, 0, 9, 8,10, 1,11,13, 7, 4,11, 0, 9,15,15],
	[15,15,15, 8, 0, 7, 3, 7, 1, 1, 4, 1, 4, 8, 0, 7, 3,15,15,15],
	[15,15,15,15, 8, 0, 0, 0,10, 4, 8,12, 9, 1, 8, 0,15,15,15,15],
	[15,15,15,15,15, 5, 8, 0,14, 9, 1,15, 1, 1, 1,15,15,15,15,15],
	[15,15,15,15,15,15, 7,15, 4, 4, 1, 8,12,10,15,15,15,15,15,15],
	[15,15,15,15,15,15,15, 2,15, 9, 4, 1, 8,15,15,15,15,15,15,15],
	[15,15,15,15,15,15,15,15, 2, 1, 8,10,15,15,15,15,15,15,15,15],
	[15,15,15,15,15,15,15,15,15, 7, 4,15,15,15,15,15,15,15,15,15]
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
	// Set canvas size (depending road size and maze size)
	var mazeCanvas = document.getElementById("maze");
	mazeCanvas.setAttribute("width", roadSize.width*(mazeSize.width/2));
	mazeCanvas.setAttribute("height", roadSize.height*(mazeSize.height/2));
	mazeCanvas.style.marginLeft = (-mazeCanvas.width/2)+"px";

	var characterCanvas = document.getElementById("character");
	characterCanvas.setAttribute("width", mazeCanvas.width);
	characterCanvas.setAttribute("height", mazeCanvas.height);
	characterCanvas.style.marginLeft = (-mazeCanvas.width/2)+"px";
	
	// Draw maze !
	drawMaze();
});

function drawMaze () {
	// Get environment
	var mazeCanvas = document.getElementById("maze");
	var mazeContext = mazeCanvas.getContext("2d");
	
	var characterCanvas = document.getElementById("character");
	var characterContext = characterCanvas.getContext("2d");

	// Draw walls
	for(var y=0; y<mazeSize.height; y++) {
		for(var x=0; x<mazeSize.width; x++) {
			drawWall(mazeContext, x, y);
		}
	}
	
	// Draw character
	drawCharacter(characterContext, character.x, character.y);
}

function drawCharacter(characterContext, x, y) {
	// Draw character
	characterContext.drawImage(characterImages[2], character.x, character.y);
}

function drawWall(context, x, y) {
	context.drawImage(wallImages[mazePattern[y][x]],
		(x+y)*roadSize.width/2+mazeDrawingOffset.x,
		(y-x)*roadSize.height/2+mazeDrawingOffset.y);
}
