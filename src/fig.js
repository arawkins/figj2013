window.onload = function () {

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 5000 );
var collidableMeshList = [];

var frameCounter = 0;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var cube = objects.makeCube({x:100,y:100,z:100});
cube.position.set(-60, 60, camera.position.z - 1900);
scene.add(cube);
collidableMeshList.push(cube);

var ship = objects.makeShip();
ship.position.set(30, 30, camera.position.z - 200)
scene.add(ship);

// FLOOR
var floorTexture = new THREE.ImageUtils.loadTexture( 'gfx/checkerboard.png' );
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set( 10, 10 );
var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
var floorGeometry = new THREE.PlaneGeometry(500, 3000, 10, 10);
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

function collision() {
	console.log(" Hit ", frameCounter);
}

function render() {
	frameCounter++;

	controls(camera, -floorHalfWidth, floorHalfWidth, ship);

	if (floor.position.z- floorHalfHeight > camera.position.z) {
		floor.position.z -= floor.geometry.height*2;
	}

	if (floor2.position.z- floorHalfHeight > camera.position.z) {
		floor2.position.z -= floor2.geometry.height*2;
	}

	// camera box / ship
	//ship.position.set(camera.position.x, camera.position.y - 25, camera.position.z - 120);

	var originPoint = ship.position.clone();

	for (var vertexIndex = 0; vertexIndex < ship.geometry.vertices.length; vertexIndex++)
	{
		var localVertex = ship.geometry.vertices[vertexIndex].clone();
		var globalVertex = localVertex.applyMatrix4( ship.matrix );
		var directionVector = globalVertex.sub( ship.position );

		var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
		var collisionResults = ray.intersectObjects( collidableMeshList );
		if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
			if (frameCounter > 1) { // dunno why, but rays collide during frame 1
				collision();
			}
			//appendText(" Hit ");
		}
	}

	renderer.render(scene, camera);
}

init();

}
