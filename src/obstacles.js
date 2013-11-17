var obstacles = (function () {

	console.log(objects);
	if (typeof objects !== 'object') throw new Error('mising object dependency')

	var collidableMeshList = [];
	var frameCounter = 0;
	var tickCounter = 0;

	var scene;
	var camera;
	var leftBound;
	var rightBound;
	var oldCubes = [];
	var cubes = [];
	var started = false;
	
	function init(_scene, _camera, _leftBound, _rightBound) {
		scene = _scene;
		camera = _camera;
		leftBound = _leftBound;
		rightBound = _rightBound;
		started = false;
	};
	
	function isStarted() {
		return started;
	}
	
	function tick() {
		if (!started) return;
		
		frameCounter = frameCounter + 1;
		tickCounter++;
		if (tickCounter > 5) {
			tickCounter = 0;
			addBox();
		}
		
		for (var i=0;i<cubes.length;i++) {
			var thisCube = cubes[i];
			thisCube.position.x += thisCube.vx;
			thisCube.position.y += thisCube.vy;
			if (thisCube.position.z > camera.position.z) {
				cubes.splice(i,1);
				scene.remove(thisCube);
				oldCubes.push(thisCube);
			}
		}
		
	};
	
	function reset() {
		for (var i=0;i<cubes.length;i++) {
			c = cubes.shift();
			scene.remove(c);
			oldCubes.push(c);
		}
		tickCounter = 0;
		start();
	}
	
	function start() {
		started = true;
	}

	function addBox() {
		
		var cube;
		if (oldCubes.length > 0) 
			cube = oldCubes.pop();
		else 		
			cube = objects.makeCube({x:getRandomInt(100,500), y:getRandomInt(50,500), z:getRandomInt(50,500)});
		
		cube.vx = getRandomInt (-3,3);
		cube.vy = getRandomInt (-3,3);
		var newX = getRandomInt(leftBound-500,rightBound+500);
		//var newX = 0;
		var newY = getRandomInt(0,1000);
		var newZ = getRandomInt(-4900,-5900) + camera.position.z;
		cube.position.set(newX, newY, newZ);
		cube.geometry.computeBoundingBox();
		
		scene.add(cube);
		//collidableMeshList.push(cube);
		cubes.push(cube);
	}

	function collide(obj) {
		for (var i=0;i<cubes.length;i++) {
			var cube = cubes[i];
			var bb = cube.geometry.boundingBox;
			var cx = cube.position.x;
			var ox = obj.position.x;
			var cz = cube.position.z;
			var oz = obj.position.z;
			var cy = cube.position.y;
			var oy = obj.position.y;
			
			//console.log('oz:', oz);
			//console.log('cz:', cz);
			/*console.log(cz + bb.min.z);
			console.log(cz + bb.max.z);
			console.log(cz);
			console.log(bb.min.z);
			console.log(bb.max.z);
			console.log('-------');
			*/
			//console.log('ox',ox,'leftx',cx + bb.min.x,'rightx',cx + bb.max.x);
			if(oz < cz + bb.max.z) {
				if(ox > cx + bb.min.x && ox < cx + bb.max.x) {
					if(oy > cy + bb.min.y && oy < cy + bb.max.y) {
						return true;
					}
				}
				
				/*
				if(ox > cx - bb.min.x || ox < cx + bb.max.x) {
					if(oy > cy - bb.min.y || oy < cy + bb.max.y) {
						return true;
					}
				}*/
			}	
			//console.log(bb.min);
			//console.log(bb.max);
			//if (bb.z > obj.position.z) {
				
			//}
			
		}
		/*
		var originPoint = obj.position.clone();

		for (var vertexIndex = 0; vertexIndex < obj.geometry.vertices.length; vertexIndex++) {
			var localVertex = obj.geometry.vertices[vertexIndex].clone();
			var globalVertex = localVertex.applyMatrix4( obj.matrix );
			var directionVector = globalVertex.sub( obj.position );

			var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
			var collisionResults = ray.intersectObjects( collidableMeshList );
			if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
				if (frameCounter > 1) { // dunno why, but rays collide during frame 1
					return true;
				}
			}
		}
		*/
	};

	return {
		init: init,
		tick: tick,
		collide: collide,
		reset: reset,
		isStarted: isStarted
	};

})()


