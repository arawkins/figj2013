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
	var baseCubeFrequency = 30;
	var cubeFrequency = 30;
	
	var gemFrequency = 300;
	var gemCounter = 0;
	
	
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
		
		
		
		if (tickCounter > cubeFrequency - (difficulty-1)*5) {
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
		
		gemCounter++;
		if(gemCounter > gemThreshold) {
			gemCounter = 0;
			
		}
		
	};
	
	function reset() {
		while(cubes.length > 0) {
			c = cubes.pop();
			scene.remove(c);
			oldCubes.push(c);
		}
		
		tickCounter = 0;
		cubeFrequency = baseCubeFrequency;
		start();
	}
	
	function start() {
		started = true;
	}

	function addBox() {
		
		var cube;
		if (oldCubes.length > 0) 
			cube = oldCubes.pop();
		else { 		
			cube = objects.makeCube({x:getRandomInt(100,500), y:getRandomInt(50,500), z:getRandomInt(50,500)});
			cube.geometry.computeBoundingBox();
		}
		
		if (difficulty >= 7) {
			cube.vx = getRandomInt (-difficulty,difficulty);
			cube.vy = getRandomInt (-difficulty,difficulty);
		} else if (difficulty >= 5) {
			var rand = getRandomInt(0,2); 
			if (rand == 1) cube.vy = getRandomInt (-difficulty,difficulty);
			else cube.vx = getRandomInt (-difficulty,difficulty);
		} else if (difficulty >= 3) 
			cube.vx = getRandomInt (-difficulty,difficulty);
		else {
			cube.vx = 0;
			cube.vy = 0;
		}
		
		var newX = getRandomInt(leftBound-500,rightBound+500);
		//var newX = 0;
		var newY = getRandomInt(0,1000);
		var newZ = getRandomInt(-4900,-5900) + camera.position.z;
		cube.position.set(newX, newY, newZ);
		
		
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
			
			if(oz < cz + bb.max.z) {
				if(oy > cy + bb.min.y && oy < cy + bb.max.y) {
				
					if(ox > cx + bb.min.x && ox < cx + bb.max.x) {
					
						return true;
					}
				}
				
			
			}	
			
			
		}
		
	};

	return {
		init: init,
		tick: tick,
		collide: collide,
		reset: reset,
		isStarted: isStarted
	};

})()


