window.onload = function () {

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 5000 );
var collidableMeshList = [];

var frameCounter = 0;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var cube = objects.makeCube({x:100, y:100, z:100});
cube.position.set(-60, 60, camera.position.z - 1900);
scene.add(cube);
collidableMeshList.push(cube);

obstacles.init(scene);

var ship = objects.makeShip();
ship.position.set(30, 30, camera.position.z - 200)
scene.add(ship);

var bullets = [];
var usedBullets = [];

// FLOOR
var floorTexture = new THREE.ImageUtils.loadTexture( '/gfx/checkeredFloorBrown.png' );
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set( 20, 20 );
var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
var floorGeometry = new THREE.PlaneGeometry(5000, 10000, 10, 10);
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


// LIGHT
	var light = new THREE.HemisphereLight(0x999999, 0x999999,2);
	//light.position.set(0,150,0);
	scene.add(light);

	// SKYBOX
var imagePrefix = "gfx/skybox-";
var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
var imageSuffix = ".jpg";
var skyGeometry = new THREE.CubeGeometry( 7000, 7000, 7000 );	

var materialArray = [];
for (var i = 0; i < 6; i++)
	materialArray.push( new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
		side: THREE.BackSide
	}));
var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
var skybox = new THREE.Mesh( skyGeometry, skyMaterial );
scene.add( skybox );

	
function init() {
	player.init();
	
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
	player.crash();
}

function shoot() {
	if (usedBullets.length > 0)  {
		
		var bullet = usedBullets.pop();
	} else {
		var bullet = objects.makeBullet();
	}	
	
	bullet.position.set(player.x-10,player.y,player.z-20);
	scene.add(bullet);
	bullets.push(bullet);
	
	if (usedBullets.length > 0) 
		var bullet2 = usedBullets.pop();
	else {
		var bullet2 = objects.makeBullet();
	}	
	
	var bullet2 = objects.makeBullet();
	bullet2.position.set(player.x+10,player.y,player.z-20);
	scene.add(bullet2);
	bullets.push(bullet2);
}

function render() {
	frameCounter++;
	
	//light.position.z = player.z;
	//light.position.x = player.x;
	skybox.position.z = camera.position.z;
	skybox.position.y = camera.position.y;
	skybox.position.x = camera.position.x;
	
	if(!player.dead) {
		
		if(Key.isDown(Key.SPACE)) {
			shoot();
		}
		
		for (var i=0;i<bullets.length;i++) {
			var thisBullet = bullets[i];
			thisBullet.position.z -= player.speed * 5;
			if (Math.abs(thisBullet.position.z - player.z) > 3000) {
				bullets.splice(i,1);
				scene.remove(thisBullet);
				usedBullets.push(thisBullet);
			}
		}
		
		controls(camera, -floorHalfWidth, floorHalfWidth, ship);
	} else {
		console.log("play again?");
	}
	if (floor.position.z- floorHalfHeight > camera.position.z) {
		floor.position.z -= floor.geometry.height*2;
	}

	if (floor2.position.z- floorHalfHeight > camera.position.z) {
		floor2.position.z -= floor2.geometry.height*2;
	}

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
		}
	}
	obstacles.collide(ship);
	//obstacles.collide(laser);
	obstacles.tick();

	renderer.render(scene, camera);
}

init();

}
