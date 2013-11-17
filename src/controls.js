var sinceLeftDown = 0;
var sinceRightDown = 0;
var wasLeftDown = false;
var wasRightDown = false;
var doubleTapThreshold = 10;
var flipThreshold = 80;
var cameraOffsetY = 70;
var cameraOffsetZ = 120;



var controls = function (camera, leftBound, rightBound, playerMesh) {

	if (!playerMesh) {
		console.log('TODO: wait for ship mesh to download');
		return;
	}
	
	if (Key.isDown(Key.LEFT)) {
		/*
		if (sinceLeftDown > 0 && sinceLeftDown < doubleTapThreshold && player.x < leftBound+flipThreshold ) {
			if (player.flip("left"))cameraOffsetY *= -1 ;
			
		}
		sinceLeftDown = 0;
		wasLeftDown = true;
		*/
		if(player.inverted) player.turnRight();
		else player.turnLeft();
		
	} else if (wasLeftDown) {
		sinceLeftDown++;
	}
	
	if (Key.isDown(Key.RIGHT)) {
		/*
		if (sinceRightDown > 0 && sinceRightDown < doubleTapThreshold && player.x > rightBound-flipThreshold) {
			if (player.flip("right")) cameraOffsetY *= -1;
			
		}
		*/
		sinceRightDown = 0;
		wasRightDown= true;
		
		if (player.inverted) player.turnLeft();
		else player.turnRight();
		
		
	} else if(wasRightDown) {
		sinceRightDown++;
	}
	
	
	
	if (Key.isDown(Key.UP)) {
		player.moveUp();
	} 
	
	if (Key.isDown(Key.DOWN)) {
		player.moveDown();
	} 
	
	
	player.update();
	
	if (!player.flipping) {
		if(player.x < leftBound) player.x = leftBound;
		else if (player.x > rightBound) player.x = rightBound;
	}
	
	playerMesh.position.set(player.x, player.y, player.z)
	playerMesh.rotation.z = player.rotation;
	
	
	camera.position.set(player.x/1.1, player.y/1.3 + cameraOffsetY, player.z + cameraOffsetZ)
	camera.rotation.z = player.flipRotation;
	
	if (Key.isDown(Key.ENTER)) {
		camera.rotation.y = Math.PI;
	} else {
		camera.rotation.y = 0;
	}
	
	
	
};
