const Bubble = require('./bubble');
const Spike = require('./spike');
const Jewel = require('./jewel');
const Util = require('./util');
const GameView = require('./game_view');

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

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, 600, 530);
  // ctx.fillStyle = "yellow";
  // ctx.fillRect(0, 0, 600, 530);

  this.bubble.draw(ctx);

  this.spikes.forEach( (spike) => {
    spike.draw();
  });
  this.sideSpikes.forEach( (spike) => {
    spike.draw();
  });
  this.jewel.draw(this.ctx);
  this.drawScore();

};

Game.prototype.drawScore = function(){
  this.ctx.font = "16px Arial";
  // this.ctx.fillStyle = "#0095DD";
  this.ctx.fillText("Score: "+ this.score, 8, 20);
  this.ctx.fillText("Hits: "+ this.wallHits, 70, 20);
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
  if(this.spikeCollisions(this.spikes) || this.spikeCollisions(this.sideSpikes)){
    this.over = true;
    this.gameOver();
  }
  this.wallCollisions();
  this.jewelCollision();

};

Game.prototype.gameOver = function(){
  this.what();
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
  let truth = false;
  spikes.forEach( (spike) =>{
    if(this.bubble.isCollidedWithSpike(spike)){
      console.log("spike collision");
      truth = true;
    }
  });
  return truth;
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
