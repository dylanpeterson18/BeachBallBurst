/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(6);
	var Bubble = __webpack_require__(2);
	
	document.addEventListener("DOMContentLoaded", function(){
	  var canvasEl = document.getElementsByTagName("canvas")[0];
	  canvasEl.width = 600;
	  canvasEl.height = 530;
	
	
	  var ctx = canvasEl.getContext("2d");
	  // ctx.fillRect(25,25,60,60);
	  const gayme = new Game(ctx);
	  const gameView = new GameView(gayme, ctx);
	  // gameView.renderStart();
	  gameView.renderStart();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Bubble = __webpack_require__(2);
	const Spike = __webpack_require__(4);
	const Jewel = __webpack_require__(5);
	const Util = __webpack_require__(3);
	const GameView = __webpack_require__(6);
	
	const Game = function(ctx){
	  this.spikes = this.addSpikesTopBottom(ctx);
	  this.stars = [];
	  this.bubble = new Bubble(this);
	  this.spikesOnLeft = false;
	  this.sideSpikes = this.addSideSpikes(ctx, 2);
	  this.ctx = ctx;
	  this.jewel = new Jewel();
	  this.score = 0;
	  this.wallHits = 0;
	  this.over = false;
	};
	
	Game.prototype.reset = function(ctx){
	  this.spikes = this.addSpikesTopBottom(ctx);
	  this.stars = [];
	  this.bubble = new Bubble(this);
	  this.spikesOnLeft = false;
	  this.sideSpikes = this.addSideSpikes(ctx, 2);
	  this.ctx = ctx;
	  this.jewel = new Jewel();
	  this.score = 0;
	  this.wallHits = 0;
	  this.over = false;
	};
	
	Game.prototype.draw = function (ctx) {
	  ctx.clearRect(0, 0, 600, 530);
	  // ctx.fillStyle = "yellow";
	  // ctx.fillRect(0, 0, 600, 530);
	  this.drawScore();
	  this.bubble.draw(ctx);
	
	  this.spikes.forEach( (spike) => {
	    spike.draw();
	  });
	  this.sideSpikes.forEach( (spike) => {
	    spike.draw();
	  });
	  this.jewel.draw(this.ctx);
	
	
	};
	
	Game.prototype.drawScore = function(){
	  const image = new Image();
	  image.src = "./lib/assets/sun1.png";
	  this.ctx.fillStyle = 'black';
	  this.ctx.textAlign = 'center';
	  this.ctx.font = "40px Sans Serif";
	
	  if(this.over){
	    let finalScore = this.score*3 + this.wallHits;
	    this.ctx.drawImage(image, 100, 30, 400, 400);
	    this.ctx.font = "30px Sans Serif";
	    this.ctx.fillText("Game Over", 300, 210);
	    this.ctx.fillText("Final score: " + finalScore, 300, 250);
	  } else {
	    this.ctx.drawImage(image, 225, 30, 150, 150);
	    this.ctx.fillText(this.wallHits, 300, 120);
	  }
	};
	
	Game.prototype.move = function(delta){
	  this.bubble.move(delta);
	};
	
	Game.prototype.step = function (delta) {
	  this.move(delta);
	  this.checkCollisions();
	  this.draw(this.ctx);
	};
	
	Game.prototype.checkCollisions = function(){
	  this.spikeCollisions(this.spikes);
	  this.spikeCollisions(this.sideSpikes);
	  this.wallCollisions();
	  this.jewelCollision();
	
	};
	
	
	Game.prototype.jewelCollision = function(){
	  let distanceBetween = Util.dist(this.bubble.pos, this.jewel.pos);
	  if(distanceBetween < (this.bubble.radius + 20)){
	    console.log("jewel collision!!!");
	    this.jewel.changePosition();
	    this.score++;
	  }
	};
	
	Game.prototype.wallCollisions = function(){
	  let num = this.num();
	  if(this.bubble.pos[0] > 580){
	    this.spikesOnLeft = true;
	    this.sideSpikes = this.addSideSpikes(this.ctx, num);
	    this.wallHits++;
	    console.log('right collision');
	    return true;
	  } else if(this.bubble.pos[0] < 20){
	    this.spikesOnLeft = false;
	    this.sideSpikes = this.addSideSpikes(this.ctx, num);
	    this.wallHits++;
	    console.log('left collision');
	    return true;
	  }
	  return false;
	};
	
	Game.prototype.gameOver = function(){
	  this.drawScore();
	};
	
	Game.prototype.num = function(){
	  if(this.wallHits <= 4){
	    return 2;
	  } else if(this.wallHits <= 8){
	    return 3;
	  } else if(this.wallHits <= 12){
	    return 4;
	  } else if(this.wallHits <= 16){
	    return 5;
	  } else if(this.wallHits <= 20){
	    return 6;
	  } else {
	    return 7;
	  }
	};
	
	Game.prototype.spikeCollisions = function(spikes){
	  let that = this;
	  spikes.forEach( (spike) =>{
	    if(this.bubble.isCollidedWithSpike(spike)){
	      console.log("spike collision");
	      that.over = true;
	    }
	  });
	};
	
	Game.prototype.wrap = function(pos){
	  if(pos[1] > 530){
	    pos[1] = pos[1] % 530;
	  } else if(pos[1] < 0){
	    pos[1] = 0;
	  }
	};
	
	Game.prototype.addSpikesTopBottom = function(ctx) {
	  let spikes = [];
	  const xVals = [0, 25, 50];
	  for (let i = 0; i < 560; i+=50){
	    let xBottomLeft = xVals[0] + i;
	    let xPoint = xVals[1] + i;
	    let xBottomRight = xVals[2] + i;
	
	  const bottomSpike = new Spike({game: this,
	    ctx: ctx,
	    vertices: [xBottomLeft, xPoint, xBottomRight, 530, 480, 530]
	    });
	    const topSpike = new Spike({game: this,
	      ctx: ctx,
	      vertices: [xBottomLeft, xPoint, xBottomRight, 0, 50, 0]
	      });
	    spikes.push(bottomSpike);
	    spikes.push(topSpike);
	  }
	  return spikes;
	};
	
	Game.prototype.allSpikes = function(ctx) {
	  let sideSpikes = [];
	  let xVals;
	  if(this.spikesOnLeft){
	    xVals = [0,50,0];
	  } else {
	    xVals = [600, 550, 600];
	  }
	  const yVals = [0, 25, 50];
	  for (let i = 40; i < 480; i+=50){
	    let yBottomLeft = yVals[0] + i;
	    let yPoint = yVals[1] + i;
	    let yBottomRight = yVals[2] + i;
	
	    const spike = new Spike({game: this,
	      ctx: ctx,
	      vertices: xVals.concat([yBottomLeft, yPoint, yBottomRight])
	      });
	    sideSpikes.push(spike);
	  }
	  return sideSpikes;
	};
	
	Game.prototype.addSideSpikes = function(ctx, num){
	  let allSideSpikes = this.allSpikes(ctx);
	  let sideSpikes = [];
	  allSideSpikes = shuffle(allSideSpikes);
	  for(let i = 0; i < num; i++){
	    sideSpikes.push(allSideSpikes[i]);
	  }
	
	  return sideSpikes;
	};
	
	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;
	
	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {
	
	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	
	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }
	
	  return array;
	}
	
	
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const Util = __webpack_require__(3);
	
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Util = {
	  // Normalize the length of the vector to 1, maintaining direction.
	  dir: function (vec) {
	    var norm = Util.norm(vec);
	    return Util.scale(vec, 1 / norm);
	  },
	  // Find distance between two points.
	  dist: function (pos1, pos2) {
	    return Math.sqrt(
	      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	    );
	  },
	  // Find the length of the vector.
	  norm: function (vec) {
	    return Util.dist([0, 0], vec);
	  },
	  // Return a randomly oriented vector with the given length.
	  randomVec : function (length) {
	    var deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	  // Scale the length of a vector by the given amount.
	  scale: function (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  },
	  inherits: function (ChildClass, BaseClass) {
	    function Surrogate () { this.constructor = ChildClass };
	    Surrogate.prototype = BaseClass.prototype;
	    ChildClass.prototype = new Surrogate();
	  },
	};
	
	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports) {

	const Jewel = function(){
	  this.pos = this.findRandomPosition();
	  this.leftSide = false;
	  this.img = new Image();
	  this.img.src = "./lib/assets/clipcoin.png";
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
	
	  ctx.drawImage(this.img, this.pos[0]-20, this.pos[1]-20, 20*2, 20*2 );
	
	};
	
	Jewel.prototype.findRandomY = function(){
	  return Math.random()*(460-70) + 70;
	};
	
	module.exports = Jewel;


/***/ },
/* 6 */
/***/ function(module, exports) {

	const GameView = function(game,ctx){
	  this.ctx = ctx;
	  this.game = game;
	};
	
	GameView.prototype.start = function () {
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
	};
	
	GameView.prototype.renderStart = function(){
	  this.bindKeyHandlers();
	
	  var pic = new Image();
	  pic.src = "./assets/pleasework.png";
	  this.ctx.fillStyle = 'white';
	  this.ctx.textAlign = 'center';
	  this.ctx.font = "30px Courier New";
	  this.ctx.fillText("Press enter to start", 300, 435);
	  this.ctx.fillText("Press spacebar to jump", 300, 475);
	  this.ctx.drawImage(pic, 60, 60, 400, 90);
	};
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map