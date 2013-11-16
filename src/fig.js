window.onload = function () {

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

	
// FLOOR
	var floorTexture = new THREE.ImageUtils.loadTexture( 'gfx/checkerboard.png' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	var floor2 = new THREE.Mesh(floorGeometry, floorMaterial);
	var floorHalfHeight = floor.geometry.height/2;
	
	floor.position.y = -20;
	floor.rotation.x = Math.PI / 2;
	
	floor2.position.y = floor.position.y;
	floor2.rotation.x = floor.rotation.x;
	floor2.position.z = -floor.geometry.height;
	
	scene.add(floor);
	scene.add(floor2);
	
function init() {

	camera.position.z = 30;
	camera.position.y = 25;
	//camera.position.x = (gridWidth + gridWidth*cubePadding)/2;
	window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
	window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
	
	render();
	
}

function render() {

	controls(camera);

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
	
	if (floor.position.z- floorHalfHeight > camera.position.z) {
		//console.log(floor.position.z);
		floor.position.z -= floor.geometry.height*2;
	} 

	if (floor2.position.z- floorHalfHeight > camera.position.z) {
		floor2.position.z -= floor2.geometry.height*2;
	}
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}


init();

}
