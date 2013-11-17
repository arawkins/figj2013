var obstacles = (function () {

	console.log(objects);
	if (typeof objects !== 'object') throw new Error('mising object dependency')

	var collidableMeshList = [];
	var frameCounter = 0;
	var tickCounter = 0;

	var scene;
	var camera;
	var oldCubes = [];
	var cubes = [];
	
	function init(_scene, _camera) {
		scene = _scene;
		camera = _camera;
	};

	function tick() {
		frameCounter = frameCounter + 1;
		tickCounter++;
		//console.log(tickCounter);
		if (tickCounter > 3) {
			tickCounter = 0;
			addBox();
		}
		
		for (var i=0;i<cubes.length;i++) {
			var thisCube = cubes[i];
			if (thisCube.position.z > camera.position.z) {
				console.log(cubes.length);
				cubes.splice(i,1);
				scene.remove(thisCube);
				oldCubes.push(thisCube);
			}
		}
		
	};

	function addBox() {
		console.log('addbox');
		
		var cube;
		if (oldCubes.length > 0) 
			cube = oldCubes.pop();
		else 		
			cube = objects.makeCube({x:100, y:100, z:100});
			
		var newX = getRandomInt(-2000,2000);
		var newY = 60;
		var newZ = getRandomInt(-1900,-2900) + camera.position.z;
		cube.position.set(newX, newY, newZ);
		scene.add(cube);
		//collidableMeshList.push(cube);
		cubes.push(cube);
	}

	function collide(obj) {
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
	};

	return {
		init: init,
		tick: tick,
		collide: collide
	};

})()


