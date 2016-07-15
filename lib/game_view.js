const GameView = function(game,ctx){
  this.ctx = ctx;
  this.game = game;
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  this.lastTime = 0;
  //start the animation
  this.requestId = requestAnimationFrame(this.animate.bind(this));
};

GameView.stop = function(){
  window.cancelAnimationFrame(this.requestId);
};

GameView.prototype.animate = function(time){
  var timeDelta = time - this.lastTime;

  this.game.step(timeDelta);
  // this.game.draw(this.ctx);
  this.lastTime = time;

  //every call to animate requests causes another call to animate
  this.requestId = requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.bindKeyHandlers = function () {
  const bubble = this.game.bubble;
  key("space", function () { bubble.powerUp() });
  key("enter", function() {console.log("nicetry")});
};

GameView.prototype.renderStart = function(){
  this.ctx.fillStyle = '#6f6f6f';
  this.ctx.textAlign = 'center';
  this.ctx.font = "30px Sans Serif";
  this.ctx.fillText("welcome to my shitty game Press enter to start", 300, 335);
  const gameview = this;
  key("enter", function() {gameview.start()});
}

module.exports = GameView;
