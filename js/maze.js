
// Params
var roadSize = {width:64, height:64};

// Maze (get it from server later)
var mazeSize = {width:20, height:20};

var mazePattern = Array(	// maze decoration
	[14,14,14,14,12,12,12,14,12,12,14,14,14,12,12,12,12,14,14,14],
	[10, 4, 1,11,13,13, 2, 1, 8,13, 7, 4, 6, 9, 3,13,13,10, 1,11],
	[14, 9, 4, 4, 4, 6, 2, 4, 4, 6,13, 2, 3, 7, 3,10, 4, 1, 4,11],
	[10, 4, 8, 0, 9, 8,13, 2, 3, 0, 7, 8, 0, 9, 8,14, 2, 1, 8,14],
	[14, 9,11, 9, 6, 7, 1, 8, 0,13, 0,10, 8,12,10,11, 9, 4, 1,11],
	[10,11, 7,11, 0, 9, 4, 4, 3,14, 2, 1,11, 2, 1, 1,11, 2, 4,11],
	[10, 1, 3,14, 2,11, 9, 8, 0,14, 9, 1, 6, 2, 1, 4, 1, 3, 9,11],
	[10, 6, 2, 6, 9, 4, 4, 4, 3,10, 4, 4, 8, 9, 1, 8,10, 8,12,14],
	[14, 0, 2, 3,12,13, 9, 3,13,10, 3,13, 7,11, 7, 1, 1, 1, 3,14],
	[14, 2, 3, 9, 3, 7, 4, 3, 7, 4, 8,12, 9, 6, 2, 1, 1, 4, 8,14],
	[14,13, 0, 7, 5, 5, 5, 8, 2, 5, 4, 3,10, 3, 0, 7, 4, 3,10,11],
	[10, 4, 5, 3,14,10, 1, 6, 9,11, 2, 5, 4, 8, 0,13, 0,13,10,11],
	[10, 8,12, 0,10, 4,11,13, 7,11, 2, 6, 9, 4, 3, 7, 3, 7, 4,11],
	[14,12, 2, 5, 6, 2, 1, 6, 2, 6, 9, 5, 6, 0,13,13, 2, 5, 3,14],
	[14, 0, 2,11, 0, 2, 6,13, 2, 5, 6,10, 5, 5, 1, 4, 5, 1, 3,14],
	[14, 0, 9,11,13, 2, 5, 6, 9, 1, 5, 6,12,12,10, 5, 1, 6,13,14],
	[14, 2, 4, 1, 4, 3,14, 2, 6,14, 7, 3, 0, 0,12,14, 7, 3, 7,11],
	[14, 2, 8, 7, 8, 0, 7, 3, 0,12, 9, 5, 5, 5, 8,12, 9, 5, 5,11],
	[14, 2, 1, 8,12, 0, 2, 5, 3, 9, 6,12,10, 1, 4, 3,10, 1, 6,14],
	[14,13,14,14,13,13,13,14,13,14,13,13,14,14,13,13,14,14,13,14]
);
var mazeData = Array(	// data collisions
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
	[1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
	[1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
	[1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
	[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
	[1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
	[1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
	[1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
	[1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
	[1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
	[1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
	[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
	[1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1],
	[1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
	[1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
	[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
	[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
	[1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
	[1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
);

var mazeDrawingOffset = {
	x:-(mazeSize.width*roadSize.width-roadSize.width)/4-roadSize.width/4,
	y:(mazeSize.height*roadSize.height-roadSize.height)/4-roadSize.height/4
};

// Character images
var Orientation = { North: 0, East: 1, South: 2, West: 3 };
var characterImageFilenames = Array("character_north.png", "character_east.png", "character_south.png", "character_west.png");
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
var character = {x:19, y:19, orientation:Orientation.East, speed:0.2};	// Character's position is relative to mazeData array (simpler for collisions)
var keyTimer = 0;

/**
 * Game entrypoint.
 * */
$(document).ready(function() {
	// Display loading screen
	showLoadingScreen();

	// Images loader
	var progress = document.getElementById("progress");
	var imageSources = new Array();
	imagesSources = imageSources.concat(wallImageFilenames, characterImageFilenames);
	loadImages(imagesSources, progress, function(){startGame();});
});

/**
 * Asserts all images in sources are loaded (or in cache).
 * */
function loadImages(sources, progressbar, callback) {
	var images = {};
	var loadedImages = 0;
	for(var src in sources) {
		images[src] = new Image();
		images[src].onload = function() {
			progress.innerHTML = Math.floor(100*loadedImages/sources.length) + " %";
			if(++loadedImages >= sources.length) {
				callback(images);
			}
		};
		images[src].src = "img/"+sources[src];
	}
}

/**
 * Show loading screen.
 * */
function showLoadingScreen() {
	var screen = document.getElementById("loader");
	screen.style.display = "block";
}

/**
 * Hide loading screen.
 * */
function hideLoadingScreen() {
	var screen = document.getElementById("loader");
	screen.style.display = "none";
}

/**
 * Callback when all game images are up.
 * */
function startGame() {
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

	// Hide loader
	hideLoadingScreen();

	// Draw maze !
	drawMaze(mazeContext);

	// Draw character !
	drawCharacter(characterContext, character.x, character.y);

	// Main loop
	setInterval(function(){loop(characterContext);}, 1000/30);
}

/**
 * Draw maze in the specified context.
 * */
function drawMaze(mazeContext) {
	// Draw walls
	for(var y=0; y<mazeSize.height; y++) {
		for(var x=0; x<mazeSize.width; x++) {
			drawWall(mazeContext, x, y);
		}
	}
}

/**
 * Draw the character in the specified context, to the coords x, y.
 * */
function drawCharacter(characterContext, x, y) {
	// Draw character at (x,y)
	characterContext.drawImage(characterImages[character.orientation],
		Math.floor((x/2+y/2)*roadSize.width/2+mazeDrawingOffset.x),
		Math.floor((y/2-x/2)*roadSize.height/2+mazeDrawingOffset.y));
}

/**
 * Draw a wall.
 * */
function drawWall(context, x, y) {
	// draw Wall (x,y)
	context.drawImage(wallImages[mazePattern[y][x]],
		Math.floor((x+y)*roadSize.width/2+mazeDrawingOffset.x),
		Math.floor((y-x)*roadSize.height/2+mazeDrawingOffset.y));
}

/**
 * Remove all in the specified context.
 * */
function clearCharacters(context) {
	// Clear all characters
	context.clearRect(0, 0, roadSize.width*mazeSize.width/2, roadSize.height*mazeSize.height/2);
}

/**
 * Main loop.
 * */
function loop(characterContext) {
	// Save old values
	oldPosition = { x:character.x, y:character.y };

	// Move
	if(keydown.left && keyTimer<=0) {
		character.orientation = (character.orientation + 3) % 4
		keyTimer = 10;
	} else if(keydown.right && keyTimer<=0) {
		character.orientation = (character.orientation + 1) % 4
		keyTimer = 10;
	} else if(keydown.up) {
		if(character.orientation == Orientation.North) {
			character.x = character.x + character.speed;
		} else if(character.orientation == Orientation.East) {
			character.y = character.y + character.speed;
		} else if(character.orientation == Orientation.South) {
			character.x = character.x - character.speed;
		} else if(character.orientation == Orientation.West) {
			character.y = character.y - character.speed;
		}
	} else if(keydown.down) {
		if(character.orientation == Orientation.North) {
			character.x = character.x - character.speed;
		} else if(character.orientation == Orientation.East) {
			character.y = character.y - character.speed;
		} else if(character.orientation == Orientation.South) {
			character.x = character.x + character.speed;
		} else if(character.orientation == Orientation.West) {
			character.y = character.y + character.speed;
		}
	}

	// Collisions with walls (restore old values if needed)
	if(mazeData[Math.floor(character.y-0.5)][Math.floor(character.x+0.5)] == 1) {
		character.x = oldPosition.x
		character.y = oldPosition.y
		console.log("hit !");
	}

	// Reset key timer for hard-gamers
	if(!keydown.right && !keydown.left) {
		keyTimer = 0;
	}

	// Update canvas
	clearCharacters(characterContext);
	drawCharacter(characterContext, character.x, character.y);

	// Update key timer
	if(keyTimer>0) {
		keyTimer--;
	}
}
