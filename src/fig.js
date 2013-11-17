window.onload = function () {

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 5000 );
var spaceship;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var logoTexture = THREE.ImageUtils.loadTexture( 'gfx/logo.png' );
var logoMaterial = new THREE.SpriteMaterial( { map: logoTexture, useScreenCoordinates: true, alignment: THREE.SpriteAlignment.center  } );
var logo = new THREE.Sprite( logoMaterial );
logo.position.set( window.innerWidth/2, window.innerHeight/2, 0 );
logo.scale.set( 1024, 256, 1.0 ); // imageWidth, imageHeight
scene.add( logo );

var gameOverTexture = THREE.ImageUtils.loadTexture( 'gfx/gameOver.png' );
var gameOverMaterial = new THREE.SpriteMaterial( { map: gameOverTexture, useScreenCoordinates: true, alignment: THREE.SpriteAlignment.center  } );
var gameOver = new THREE.Sprite( gameOverMaterial );
gameOver.position.set( window.innerWidth/2, window.innerHeight/2, 0 );
gameOver.scale.set( 1024, 256, 1.0 ); // imageWidth, imageHeight
//scene.add( gameOver );

var difficulty = 1;
var difficultyTimer = 0;
var difficultyThreshold = 3600;
var bullets = [];
var usedBullets = [];

// FLOOR
var floorTexture = new THREE.ImageUtils.loadTexture( '/gfx/checkeredFloorBrown.png' );
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set( 20, 20 );
var floorMaterial = new THREE.MeshLambertMaterial( { map: floorTexture, side: THREE.DoubleSide } );
var floorGeometry = new THREE.PlaneGeometry(5000, 10000, 10, 10);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
var floor2 = new THREE.Mesh(floorGeometry, floorMaterial);
var floorHalfHeight = floor.geometry.height/2;
var floorHalfWidth = floor.geometry.width/2;
floor.position.y = 0;
floor.rotation.x = Math.PI / 2;
floor.receiveShadow = true;

floor2.position.y = floor.position.y;
floor2.rotation.x = floor.rotation.x;
floor2.position.z = -floor.geometry.height;
floor2.receiveShadow = true;

scene.add(floor);
scene.add(floor2);

var leftBound = -floorHalfWidth + 1000;
var rightBound = floorHalfWidth - 1000;

obstacles.init(scene, camera, leftBound, rightBound);

// LIGHT
var light = new THREE.HemisphereLight(0xFFFFFF, 0x999999,1);
light.position.set(3000,1000,-5000);
scene.add(light);

dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
dirLight.color.setHSL( 0.1, 1, 0.95 );
dirLight.position.set( 300, 100, -500 );
dirLight.position.multiplyScalar( 50 );
scene.add( dirLight );

dirLight.castShadow = true;

dirLight.shadowMapWidth = 2048;
dirLight.shadowMapHeight = 2048;

var d = 50;

dirLight.shadowCameraLeft = -d;
dirLight.shadowCameraRight = d;
dirLight.shadowCameraTop = d;
dirLight.shadowCameraBottom = -d;

dirLight.shadowCameraFar = 3500;
dirLight.shadowBias = -0.0001;
dirLight.shadowDarkness = 0.35;

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

var ambientLight = new THREE.AmbientLight(0x111111);
scene.add(ambientLight);	

//var hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0xd7cbb0);
//scene.add(hemiLight);


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

function startGame() {
	player.reset();
	obstacles.reset();
	scene.remove(logo);
	difficulty = 1;
	difficultyTimer = 0;
	scene.remove(gameOver);
}

function collision() {
	player.crash();
	scene.add(gameOver);
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
	
	if (!obstacles.isStarted() && Key.isDown(Key.SPACE)) {
		
		startGame();
	}
	
	if (obstacles.isStarted()) {
		difficultyTimer++;
		
		if(difficultyTimer > difficultyThreshold) {
			difficulty++;
			difficultyTimer = 0;
		}
		
	}
	
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
		
		controls(camera, leftBound, rightBound, spaceship);
	} else {
		if(Key.isDown(Key.SPACE)) {
			console.log('made it here');
			startGame();
			
		}
		
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


