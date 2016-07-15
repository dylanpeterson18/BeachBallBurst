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
  const gameview = this;
  key("space", function () { bubble.powerUp() });

};

GameView.prototype.renderStart = function(){
  key("enter", function() {gameview.start()});
}

module.exports = GameView;
