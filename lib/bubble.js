const Game = require('./game');
const Util = require('./util');

var DEFAULTS = {
	COLOR: "green",
	RADIUS: 25,
	POSITION: [300,265],
	VELOCITY: [4, -2.5]
};

const Bubble = function(game){
  this.pos = DEFAULTS.POSITION;
  this.vel = DEFAULTS.VELOCITY;
  this.radius = DEFAULTS.RADIUS;
  this.color = DEFAULTS.COLOR;
	this.game = game;
	this.img = new Image();
	this.img.src = "./lib/assets/beach_ball1.png";
};

Bubble.prototype.draw = function(ctx){
	  // ctx.fillStyle = this.color;
		ctx.drawImage(this.img, this.pos[0]-this.radius, this.pos[1]-this.radius, this.radius*2, this.radius*2 );
	  // ctx.beginPath();
	  // ctx.arc(
	  //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
	  // );
	  // ctx.fill();
};

Bubble.prototype.move = function(timeDelta){
	var velocityScale = timeDelta / (1000/60),
      offsetX = this.vel[0] * velocityScale,
      offsetY = this.vel[1] * velocityScale;
	this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
	this.vel[1] = this.vel[1] + .5;
	this.game.wrap(this.pos);
	this.checkBounds();
};

Bubble.prototype.checkBounds = function(){
	if(this.pos[0] > 580 || this.pos[0] < 20){
    this.vel[0] = -this.vel[0];
  }
};

Bubble.prototype.powerUp = function(){
	this.vel[1] = -10;
};

Bubble.prototype.isCollidedWithSpike = function(spike){
	const spikePos = [spike.vertices[1], spike.vertices[4]];
	const distanceBetween = Util.dist(this.pos, spikePos);
	if(distanceBetween < DEFAULTS.RADIUS){
		return true;
	} else {
		return false;
	}
};

module.exports = Bubble;
