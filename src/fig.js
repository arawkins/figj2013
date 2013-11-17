window.onload = function () {

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 5000 );
var spaceship;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

obstacles.init(scene, camera);

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

// Note: if imported model appears too dark,
//   add an ambient light in this file
//   and increase values in model's exported .js file
//    to e.g. "colorAmbient" : [0.75, 0.75, 0.75]
var jsonLoader = new THREE.JSONLoader();
jsonLoader.load( "models/spaceship.js", addModelToScene );

//var ambientLight = new THREE.AmbientLight(0x111111);
//scene.add(ambientLight);	

var hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0xd7cbb0);
//scene.add(hemiLight);

// White directional light at half intensity shining from the top.

var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 2500, 2500, -500 );
scene.add( directionalLight );

function addModelToScene( geometry, materials ) 
{
	var material = new THREE.MeshFaceMaterial( materials );
	spaceship = new THREE.Mesh( geometry, material );
	spaceship.scale.set(20,20,20);
	spaceship.rotation.y += Math.PI;
	scene.add( spaceship );
	console.log("loaded");
	spaceship.position.z = -500;
}


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
	console.log(" Hit ");
	player.crash();
}

function shoot() {
	if (usedBullets.length > 0)  {
		
		var bullet = usedBullets.pop();
	} else {
		var bullet = objects.makeBullet();
	}	
	
	bullet.position.set(player.x-20,player.y-10,player.z);
	scene.add(bullet);
	bullets.push(bullet);
	
	if (usedBullets.length > 0) 
		var bullet2 = usedBullets.pop();
	else {
		var bullet2 = objects.makeBullet();
	}	
	
	var bullet2 = objects.makeBullet();
	bullet2.position.set(player.x+20,player.y-10,player.z);
	scene.add(bullet2);
	bullets.push(bullet2);
}

function render() {
	//light.position.z = player.z;
	//light.position.x = player.x;
	skybox.position.z = camera.position.z;
	skybox.position.y = camera.position.y;
	skybox.position.x = camera.position.x;
	
	directionalLight.position.set( spaceship.position.x + 100, spaceship.position.y+550, spaceship.position.z-500 );
	//shipMesh.position.z = player.z - 500;
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
		
		controls(camera, -floorHalfWidth, floorHalfWidth, spaceship);
	} else {
		console.log("play again?");
		return;
	}
	if (floor.position.z- floorHalfHeight > camera.position.z) {
		floor.position.z -= floor.geometry.height*2;
	}

	if (floor2.position.z- floorHalfHeight > camera.position.z) {
		floor2.position.z -= floor2.geometry.height*2;
	}

	if (obstacles.collide(spaceship)) {
    collision();
  };
	//obstacles.collide(laser);
	obstacles.tick();

	renderer.render(scene, camera);
}

init();

}


