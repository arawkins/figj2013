window.onload = function () {

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var scrollSpeed = 0.5;
var cameraVX = 0;
var cameraVY = 0;
var cameraAccel = 0.05;
var cameraMaxVelocity = 0.25;
var cameraMinAltitude = 3;
var rollSpeed = 0.01;


	
// FLOOR
	var floorTexture = new THREE.ImageUtils.loadTexture( 'gfx/checkerboard.png' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -20;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);

function init() {

	camera.position.z = 30;
	camera.position.y = 4;
	//camera.position.x = (gridWidth + gridWidth*cubePadding)/2;
	window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
	window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
	
	render();
	
}

function render() {
	
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
	/*
	var frontLeftCube = grid[grid.length-1][0];
	if (frontLeftCube.position.z > camera.position.z) {
		var lastRow = grid.pop();
		for (var i=0;i<lastRow.length;i++) {
			var cube = lastRow[i];
			cube.position.z -= gridDepth + gridDepth*cubePadding;
		}
		var newRow = shuffle(lastRow);
		grid.unshift(shuffle(newRow));
	}
*/
	
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}


init();

}