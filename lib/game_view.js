const GameView = function(game,ctx){
  this.ctx = ctx;
  this.game = game;
};

GameView.prototype.start = function () {

  this.lastTime = 0;
  this.game.firstFrame = true;
  //start the animation
  this.requestId = requestAnimationFrame(this.animate.bind(this));
};

GameView.stop = function(){
  window.cancelAnimationFrame(this.requestId);
};

GameView.prototype.animate = function(time){
  var timeDelta;
  if(this.game.firstFrame){
    timeDelta = 0;
  } else {
    timeDelta = time - this.lastTime;
  }

  this.game.step(timeDelta);
  // this.game.draw(this.ctx);
  this.lastTime = time;

  if(this.game.over){
    this.game.gameOver();
  } else {
    this.requestId = requestAnimationFrame(this.animate.bind(this));
  }
  //every call to animate requests causes another call to animate
};

GameView.prototype.bindKeyHandlers = function () {
  const game = this.game;
  const that = this;
  key("space", function () { game.bubble.powerUp() });
  key("enter", function() {
    that.start();
  });
  key("b", function() {location.reload()});
};

GameView.prototype.renderStart = function(){
  this.bindKeyHandlers();

  var pic = new Image();
  pic.src = "./lib/assets/pleasework.png";
  this.ctx.fillStyle = 'white';
  this.ctx.textAlign = 'center';
  this.ctx.font = "30px Courier New";
  this.ctx.fillText("Press enter to start", 300, 435);
  this.ctx.fillText("Press spacebar to jump", 300, 475);
  this.ctx.fillStyle = 'black';
  this.ctx.font = "25px Courier New";
  this.ctx.fillText("AVOID THE SHARK TEETH", 300, 510);
  this.ctx.drawImage(pic, 60, 60, 400, 90);
};

module.exports = GameView;
