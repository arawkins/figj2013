var objects = (function () {


	// Cube idea
	function makeCube(dimensions) {
		var cube;
		// Create an array of materials to be used in a cube, one for each side
		var cubeMaterialArray = [];
		// order to add materials: x+,x-,y+,y-,z+,z-
		cubeMaterialArray.push( new THREE.MeshLambertMaterial( { color: 0xff3333 } ) );
		cubeMaterialArray.push( new THREE.MeshLambertMaterial( { color: 0xff8800 } ) );
		cubeMaterialArray.push( new THREE.MeshLambertMaterial( { color: 0xffff33 } ) );
		cubeMaterialArray.push( new THREE.MeshLambertMaterial( { color: 0x33ff33 } ) );
		cubeMaterialArray.push( new THREE.MeshLambertMaterial( { color: 0x3333ff } ) );
		cubeMaterialArray.push( new THREE.MeshLambertMaterial( { color: 0x8833ff } ) );
		var cubeMaterials = new THREE.MeshFaceMaterial( cubeMaterialArray );
		// Cube parameters: width (x), height (y), depth (z),
		//        (optional) segments along x, segments along y, segments along z
		var cubeGeometry = new THREE.CubeGeometry( dimensions.x, dimensions.y, dimensions.z, 1, 1, 1 );
		// using THREE.MeshFaceMaterial() in the constructor below
		//   causes the mesh to use the materials stored in the geometry
		cube = new THREE.Mesh( cubeGeometry, cubeMaterials );
		return cube;
	};
	
	
	
	function makeBullet() {
	
		var bulletMaterial = new THREE.MeshBasicMaterial({color:0x00d4dc});
		var bulletGeometry = new THREE.CubeGeometry(2,2,100,1,1,1);
		var bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
		return bullet;
	};

	function makeShip() {
		return makeCube({x: 20, y: 10, z: 30});
	};

	return {
		makeShip: makeShip,
		makeCube: makeCube,
		makeBullet: makeBullet
	};

})()


