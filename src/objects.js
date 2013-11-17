var objects = (function () {
	
	var gems = [];
	
	var bluegemMaterial;
	var bluegemGeometry;

	var redgemMaterial;
	var redgemGeometry;

	var greengemMaterial;
	var greengemGeometry;

	var whitegemMaterial;
	var whitegemGeometry;
	
	function loadGems() {
		var jsonLoader = new THREE.JSONLoader();
		jsonLoader.load( "models/bluegem.js", addBlueGem );
		jsonLoader.load( "models/greengem.js", addWhiteGem);
		jsonLoader.load( "models/redgem.js", addRedGem);
		jsonLoader.load( "models/whitegem.js", addWhiteGem);

		
	}
	
	function addBlueGem(geometry, materials) {
		bluegemMaterial = new THREE.MeshFaceMaterial( materials );
		bluegemGeometry = geometry;
		gems["blue"] = new THREE.Mesh( bluegemGeometry, bluegemMaterial );
	}

	function addGreenGem(geometry, materials) {
		greengemMaterial = new THREE.MeshFaceMaterial( materials );
		greengemGeometry = geometry;
		gems["green"] = new THREE.Mesh( greengemGeometry, greengemMaterial );
	}


	function addRedGem(geometry, materials) {
		redgemMaterial = new THREE.MeshFaceMaterial( materials );
		redgemGeometry = geometry;
		gems["red"] = new THREE.Mesh( redgemGeometry, redgemMaterial );
	}

	function addWhiteGem(geometry, materials) {
		whitegemMaterial = new THREE.MeshFaceMaterial( materials );
		whitegemGeometry = geometry;
		gems["white"] = new THREE.Mesh( whitegemGeometry, whitegemMaterial );
	}
	
	function makeGem(color) {
		var gem = gems[color];
		
		gem.scale.set(50,50,50);
		return gem;
		
		/*
		var material;
		var geometry;
		var value;
		
		switch(color) {
		
			
			
			case "green":
			material = greengemMaterial;
			geometry = greengemGeometry;
			value = 250;
			break;
			
			case "red":
			material = redgemMaterial;
			geometry = redgemGeometry;
			value = 500;
			break;
			
			case "white":
			material = whitegemMaterial;
			geometry = whitegemGeometry;
			value = 1000;
			break;
			
			case "blue":
			material = bluegemMaterial;
			geometry = bluegemGeometry;
			value = 100;
			break;
			
		}
		
		
		gem = new THREE.Mesh( geometry, material );
		gem.scale.set(50,50,50);
		return gem;
		*/
	}
	
	
	// Cube idea
	function makeCube(dimensions) {
		var cube;
		// Create an array of materials to be used in a cube, one for each side
		var cubeMaterialArray = [];
		// order to add materials: x+,x-,y+,y-,z+,z-
		cubeMaterialArray.push( new THREE.MeshLambertMaterial( { color: 0xe0d8c6 } ) );
		cubeMaterialArray.push( new THREE.MeshLambertMaterial( { color: 0x837f75 } ) );
		cubeMaterialArray.push( new THREE.MeshLambertMaterial( { color: 0xe0d8c6 } ) );
		cubeMaterialArray.push( new THREE.MeshLambertMaterial( { color: 0x837f75 } ) );
		cubeMaterialArray.push( new THREE.MeshLambertMaterial( { color: 0xd7cbb0 } ) );
		cubeMaterialArray.push( new THREE.MeshLambertMaterial( { color: 0x837f75 } ) );
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
		var bulletGeometry = new THREE.CubeGeometry(5,5,50,1,1,1);
		var bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
		return bullet;
	};

	function makeShip() {
		return makeCube({x: 20, y: 10, z: 30});
	};

	return {
		makeShip: makeShip,
		makeCube: makeCube,
		makeBullet: makeBullet,
		loadGems : loadGems,
		makeGem : makeGem
	};

})()


