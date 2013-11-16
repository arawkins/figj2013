var cameraVX = 0;
var cameraVY = 0;
var cameraDrag = 0.96;

var sinceLeftDown = 0;
var sinceRightDown = 0;
var wasLeftDown = false;
var wasRightDown = false;
var doubleTapThreshold = 10;

var flip = function (camera, direction) {
	
}

var controls = function (camera, leftBound, rightBound) {
	var scrollSpeed = 5;
	var cameraAccel = 0.6;
	var cameraMaxVelocity = 10;
	var cameraMinAltitude = 3;
	var rollSpeed = 0.03;
	var rollResetSpeed = 0.02;
	var maxRoll = 0.5;
	
	
	
	if (Key.isDown(Key.LEFT)) {
		if (sinceLeftDown > 0 && sinceLeftDown < doubleTapThreshold) {
			console.log("DOUBLE LEFT");
		}
		sinceLeftDown = 0;
		wasLeftDown = true;
		
		//player.vx -= player.turnSpeed;
		player.turnLeft();
		
		//cameraVX -= cameraAccel;
		//if (cameraVX < -cameraMaxVelocity) cameraVX = -cameraMaxVelocity;
		
		
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
		//cameraVX += cameraAccel;
		//if (cameraVX > cameraMaxVelocity) cameraVX = cameraMaxVelocity;
		
	} else if(wasRightDown) {
		sinceRightDown++;
	}
	
	player.applyDrift();
	//cameraVX *= cameraDrag;
	//if (Math.abs(cameraVX) < .01) cameraVX = 0;
	
	
	player.applyRoll();
	//var newRotation = -cameraVX * 0.03;
	//if (newRotation < -maxRoll) newRotation = -maxRoll;
	//else if (newRotation > maxRoll) newRotation = maxRoll;
	
	
	//camera.rotation.z  = newRotation;
	
	camera.rotation.z = player.rotation;
	
	var adjustedScroll = player.speed;
	/*
	if (Key.isDown(Key.UP)) {
		adjustedScroll *= 2;
	}
	if (Key.isDown(Key.DOWN)) {
		adjustedScroll /=2 ;
	}
	*/
	player.update();
	camera.position.x = player.x;
	camera.position.z = player.z;
	//camera.position.z -= adjustedScroll;
	
	
	if(camera.position.x < leftBound) camera.position.x = leftBound;
	else if (camera.position.x > rightBound) camera.position.x = rightBound;
};
