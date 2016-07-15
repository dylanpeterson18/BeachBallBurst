var Game = require("./game");
var GameView = require("./game_view");
var Bubble = require('./bubble');

document.addEventListener("DOMContentLoaded", function(){
  var canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 600;
  canvasEl.height = 530;


  var ctx = canvasEl.getContext("2d");
  // ctx.fillRect(25,25,60,60);
  const gayme = new Game(ctx);
  const gameView = new GameView(gayme, ctx);
  // gameView.renderStart();
  gameView.start();
});
