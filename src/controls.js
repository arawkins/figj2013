var sinceLeftDown = 0;
var sinceRightDown = 0;
var wasLeftDown = false;
var wasRightDown = false;
var doubleTapThreshold = 10;
var flipThreshold = 50;


var controls = function (camera, leftBound, rightBound) {
	
	if (Key.isDown(Key.LEFT)) {
		if (sinceLeftDown > 0 && sinceLeftDown < doubleTapThreshold) {
			player.flip("left");
		}
		sinceLeftDown = 0;
		wasLeftDown = true;
		
		if(player.inverted) player.turnRight();
		else player.turnLeft();
		
	} else if (wasLeftDown) {
		sinceLeftDown++;
	}
	
	if (Key.isDown(Key.RIGHT)) {
		if (sinceRightDown > 0 && sinceRightDown < doubleTapThreshold) {
			player.flip("right");
		}
		sinceRightDown = 0;
		wasRightDown= true;
		
		if (player.inverted) player.turnLeft();
		else player.turnRight();
		
	} else if(wasRightDown) {
		sinceRightDown++;
	}
	
	
	
	if (Key.isDown(Key.UP)) {
		player.boost();
	} else {
		player.stopBoosting();
	}
	
	if (Key.isDown(Key.DOWN)) {
		player.brake();
	} else {
		player.stopBraking();
	}
	
	
	player.update();
	
	if (!player.flipping) {
		if(player.x < leftBound) player.x = leftBound;
		else if (player.x > rightBound) player.x = rightBound;
	}
	
	camera.rotation.z = player.rotation;
	
	camera.position.x = player.x;
	camera.position.y = player.y;
	camera.position.z = player.z;
	
};
