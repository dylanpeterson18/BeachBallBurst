const Spike = function(options){
  this.vertices = options.vertices;
  this.game = options.game;
  this.ctx = options.ctx;
}

Spike.prototype.draw = function() {

  const ctx = this.ctx;

  ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.vertices[0],this.vertices[3]);
    ctx.lineTo(this.vertices[1],this.vertices[4]);
    ctx.lineTo(this.vertices[2],this.vertices[5]);
    ctx.fill();
};

module.exports = Spike;
