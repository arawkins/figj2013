var player = {
	x:0,
	y:0,
	z:0,
	vx:0,
	vy:0,
	speed:5,
	thrusterSpeed:5,
	rotation:0,
	maxRotation:0.5,
	turnSpeed:0.6,
	maxTurnSpeed:10,
	drift:0.96,
	
	turnLeft : function() {
		this.vx -= this.turnSpeed;
		if (this.vx < -this.maxTurnSpeed) this.vx = -maxTurnSpeed;
	},
	
	turnRight : function() {
		this.vx += this.turnSpeed;
		if (this.vx > this.maxTurnSpeed) this.vx = maxTurnSpeed;
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
		this.x += this.vx;
		this.z -= this.speed;
	}
}