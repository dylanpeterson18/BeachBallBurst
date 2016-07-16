const Spike = function(options){
  this.vertices = options.vertices;
  this.game = options.game;
  this.ctx = options.ctx;
  this.img = new Image();
  this.loc = options.loc;
};

Spike.prototype.draw = function() {
  const ctx = this.ctx;


  ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(this.vertices[0],this.vertices[3]);
    ctx.lineTo(this.vertices[1],this.vertices[4]);
    ctx.lineTo(this.vertices[2],this.vertices[5]);
    ctx.fill();
  let xCorrection = 0;
  let yCorrection = 0;
  if(this.loc === "top"){
      this.img.src = "./lib/assets/toptooth.png";
  } else if(this.loc === "bottom"){
      yCorrection = -50;
      this.img.src = "./lib/assets/bottomtooth.png";
  } else if(this.loc === "left"){
      this.img.src = "./lib/assets/lefttooth.png";
  } else if(this.loc === "right"){
      xCorrection = -50;
      this.img.src = "./lib/assets/righttooth.png";
  }

  ctx.drawImage(this.img, this.vertices[0] + xCorrection, this.vertices[3] + yCorrection, 50, 50);
};

module.exports = Spike;
