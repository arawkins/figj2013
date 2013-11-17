var obstacles = (function () {

	console.log(objects);
	if (typeof objects !== 'object') throw new Error('mising object dependency')

	var collidableMeshList = [];
	var frameCounter = 0;
	var tickCounter = 0;

	var scene;
	var camera;

	function init(_scene, _camera) {
		scene = _scene;
		camera = _camera;
	};

	function tick() {
		frameCounter = frameCounter + 1;
		tickCounter++;
		//console.log(tickCounter);
		if (tickCounter > 100) {
			tickCounter = 0;
			addBox();
		}
	};

	function addBox() {
		console.log('addbox')
		var cube = objects.makeCube({x:100, y:100, z:100});
		cube.position.set(-60, 60, camera.position.z - 1900);
		scene.add(cube);
		collidableMeshList.push(cube);
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


