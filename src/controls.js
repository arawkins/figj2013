var sinceLeftDown = 0;
var sinceRightDown = 0;
var wasLeftDown = false;
var wasRightDown = false;
var doubleTapThreshold = 10;

var flip = function (camera, direction) {
	
}

var controls = function (camera, leftBound, rightBound) {
	
	if (Key.isDown(Key.LEFT)) {
		if (sinceLeftDown > 0 && sinceLeftDown < doubleTapThreshold) {
			console.log("DOUBLE LEFT");
		}
		sinceLeftDown = 0;
		wasLeftDown = true;
		
		player.turnLeft();
		
	} else if (wasLeftDown) {
		sinceLeftDown++;
	}
	
	if (Key.isDown(Key.RIGHT)) {
		if (sinceRightDown > 0 && sinceRightDown < doubleTapThreshold) {
			console.log("DOUBLE RIGHT");
		}
		sinceRightDown = 0;
		wasRightDown= true;
		
		player.turnRight();
		
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
	if(player.x < leftBound) player.x = leftBound;
	else if (player.x > rightBound) player.x = rightBound;
	
	
	camera.rotation.z = player.rotation;
	camera.position.x = player.x;
	camera.position.z = player.z;
	
};
