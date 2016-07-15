const Jewel = function(){
  this.pos = this.findRandomPosition();
  this.leftSide = false;
  this.img = new Image();
  this.img.src = "./lib/assets/gold-coin.png";
};

Jewel.prototype.findRandomPosition = function(){
  if(this.leftSide){
    return [70, this.findRandomY()];
  } else {
    return [510, this.findRandomY()];
  }
};

Jewel.prototype.changePosition = function(){
  if(this.leftSide){
    this.leftSide = false;
  } else {
    this.leftSide = true;
  }

  this.pos = this.findRandomPosition();
};

Jewel.prototype.draw = function(ctx){
  // ctx.fillStyle = "black";

  ctx.drawImage(this.img, this.pos[0]-20, this.pos[1]-20, 20*2, 20*2 );

  // ctx.beginPath();
  // ctx.arc(
  //   this.pos[0], this.pos[1], 20, 0, 2 * Math.PI, true
  // );
  // ctx.fill();
};

Jewel.prototype.findRandomY = function(){
  return Math.random()*(460-70) + 70;
};

module.exports = Jewel;
