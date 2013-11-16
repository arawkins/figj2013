var player = {
	x:0,
	y:0,
	z:0,
	vx:0,
	vy:0,
	speed:5,
	boostSpeed:5,
	rotation:0,
	maxRotation:0.5,
	turnSpeed:0.6,
	maxTurnSpeed:10,
	drift:0.96,
	boosting:false,
	braking:false,
	
	init : function() {
		this.vz = this.speed;
		this.x = 30;
		this.y = 25;
	},
	
	turnLeft : function() {
		this.vx -= this.turnSpeed;
		if (this.vx < -this.maxTurnSpeed) this.vx = -this.maxTurnSpeed;
	},
	
	turnRight : function() {
		this.vx += this.turnSpeed;
		if (this.vx > this.maxTurnSpeed) this.vx = this.maxTurnSpeed;
	},
	
	boost : function() {
		if(!this.boosting) {
			this.boosting = true;
			this.vz = this.speed + this.boostSpeed;
		}
	},
	
	stopBoosting:function() {
		if(this.boosting) {
			this.boosting = false;
			this.vz = this.speed;
		}
	},
	
	brake : function() {
		if (!this.braking) {
			this.braking = true;
			this.vz = this.speed / 2;
		}
	},
	
	stopBraking: function() {
		if (this.braking) {
			this.braking = false;
			this.vz = this.speed;
		}
		
	},
	
	applyDrift : function() {
		this.vx *= this.drift;
		if (Math.abs(this.vx) < .01) this.vx = 0;
	},
	
	applyRoll : function() {
		this.rotation = -this.vx * 0.03;
		if (this.rotation < -this.maxRotation) this.rotation = -this.maxRotation;
		else if (this.rotation > this.maxRotation) this.rotation = this.maxRotation;
	},
	
	update : function () {
		this.applyDrift();
		this.applyRoll();
		this.x += this.vx;
		this.z -= this.vz;
	}
}