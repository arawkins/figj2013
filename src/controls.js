var controls = function (camera) {
	var scrollSpeed = 0.5;
	var cameraVX = 0;
	var cameraVY = 0;
	var cameraAccel = 0.05;
	var cameraMaxVelocity = 0.25;
	var cameraMinAltitude = 3;
	var rollSpeed = 0.01;

	if (Key.isDown(Key.LEFT)) {
		cameraVX -= cameraAccel;
		if (cameraVX < -cameraMaxVelocity) cameraVX = -cameraMaxVelocity;
		//camera.rotation.z += rollSpeed;
	} else {
		if (camera.rotation.z > 0) camera.rotation.z -= rollSpeed;
		if (cameraVX < 0 ) {
			cameraVX += cameraAccel;
			if (cameraVX > 0) cameraVX = 0;
		}
	}

	if (Key.isDown(Key.RIGHT)) {
		cameraVX += cameraAccel;
		if (cameraVX > cameraMaxVelocity) cameraVX = cameraMaxVelocity;
		//camera.rotation.z -= rollSpeed;
	} else {
		if (camera.rotation.z < 0) camera.rotation.z += rollSpeed;
		if (cameraVX > 0 ) {
			//cameraVX -= cameraAccel;
			if (cameraVX < 0) cameraVX = 0;
		}
	}	

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
