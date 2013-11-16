var cameraVX = 0;
var cameraVY = 0;
var cameraDrag = 0.96;

var controls = function (camera) {
	var scrollSpeed = 5;
	
	var cameraAccel = 0.3;
	var cameraMaxVelocity = 6;
	var cameraMinAltitude = 3;
	var rollSpeed = 0.03;
	var rollResetSpeed = 0.02;
	var maxRoll = 0.5;
	
	if (Key.isDown(Key.LEFT)) {
		cameraVX -= cameraAccel;
		if (cameraVX < -cameraMaxVelocity) cameraVX = -cameraMaxVelocity;
		
	} 
	if (Key.isDown(Key.RIGHT)) {
		cameraVX += cameraAccel;
		if (cameraVX > cameraMaxVelocity) cameraVX = cameraMaxVelocity;
		
	} 
	
	
	cameraVX *= cameraDrag;
	if (Math.abs(cameraVX) < .01) cameraVX = 0;
	
	
	var newRotation = -cameraVX * 0.1;
	if (newRotation < -maxRoll) newRotation = -maxRoll;
	else if (newRotation > maxRoll) newRotation = maxRoll;
	
	
	camera.rotation.z  = newRotation;

	var adjustedScroll = scrollSpeed;

	if (Key.isDown(Key.UP)) {
		adjustedScroll *= 2;
	}
	if (Key.isDown(Key.DOWN)) {
		adjustedScroll /=2 ;
	}

	camera.position.z -= adjustedScroll;
	camera.position.x += cameraVX;
};
