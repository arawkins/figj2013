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
	var floorGeometry = new THREE.PlaneGeometry(500, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	var floor2 = new THREE.Mesh(floorGeometry, floorMaterial);
	var floorHalfHeight = floor.geometry.height/2;
	var floorHalfWidth = floor.geometry.width/2;
	floor.position.y = 0;
	floor.rotation.x = Math.PI / 2;
	
	floor2.position.y = floor.position.y;
	floor2.rotation.x = floor.rotation.x;
	floor2.position.z = -floor.geometry.height;
	
	scene.add(floor);
	scene.add(floor2);
	
function init() {
	player.init();
	
	camera.position.z = player.x;
	camera.position.y = player.y;
	window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
	window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
	
	animloop();
	
}

function animloop() {
	requestAnimationFrame(animloop);
	render();
}

function render() {
	
	controls(camera, -floorHalfWidth, floorHalfWidth);
	
	if (floor.position.z- floorHalfHeight > camera.position.z) {
		floor.position.z -= floor.geometry.height*2;
	}

	if (floor2.position.z- floorHalfHeight > camera.position.z) {
		floor2.position.z -= floor2.geometry.height*2;
	}
	renderer.render(scene, camera);
}

init();

}
