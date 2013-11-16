var sinceLeftDown = 0;
var sinceRightDown = 0;
var wasLeftDown = false;
var wasRightDown = false;
var doubleTapThreshold = 10;
var flipThreshold = 50;
var cameraOffsetY = 45;
var cameraOffsetZ = 90;

var controls = function (camera, leftBound, rightBound, playerMesh) {
	
	if (Key.isDown(Key.LEFT)) {
		if (sinceLeftDown > 0 && sinceLeftDown < doubleTapThreshold) {
			if (player.flip("left"))cameraOffsetY *= -1 ;
			
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
			if (player.flip("right")) cameraOffsetY *= -1;
			
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
	
	//camera.rotation.z = player.rotation;
	playerMesh.position.set(player.x, player.y, player.z)
	playerMesh.rotation.z = player.rotation;
	camera.position.set(player.x, player.y + cameraOffsetY, player.z + cameraOffsetZ)
	camera.rotation.z = player.flipRotation+ player.rotation/3;
	
	//camera.position.x = player.x;
	//camera.position.y = player.y;
	//camera.position.z = player.z;
	
};
