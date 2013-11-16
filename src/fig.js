window.onload = function () {

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// Cube idea
// Create an array of materials to be used in a cube, one for each side
var cubeMaterialArray = [];
// order to add materials: x+,x-,y+,y-,z+,z-
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
var cubeMaterials = new THREE.MeshFaceMaterial( cubeMaterialArray );
// Cube parameters: width (x), height (y), depth (z),
//        (optional) segments along x, segments along y, segments along z
var cubeGeometry = new THREE.CubeGeometry( 100, 100, 100, 1, 1, 1 );
// using THREE.MeshFaceMaterial() in the constructor below
//   causes the mesh to use the materials stored in the geometry
cube = new THREE.Mesh( cubeGeometry, cubeMaterials );
cube.position.set(-60, 60, camera.position.z - 500);
scene.add( cube );

	
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
