var mic;
var volume;

var playerX;
var playerY;

var startGame = false;
var gameover = false;
var youWin = false;

var allMyBarriers = [];
var amountOfBarriers = 8;


function preload() {
  // put preload code here
}

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);

  //imposta input sul microfono e comincia a rilevare input
  mic = new p5.AudioIn();
  mic.start();

  //player position X & Y
  playerY = windowHeight * 0.4;
  playerX = 25;

  //barriers
  for (var i = 0; i < amountOfBarriers; i++) {
    var tempx = windowWidth / 10 + i * windowWidth / 10;
    var tempy = 0;

    var tempBarrier = new CreateBarrier(tempx, tempy);
    allMyBarriers.push(tempBarrier);
  }
}

function draw() {

  volume = mic.getLevel();
  clear();

  background(0);

  //info gameplay
  if (startGame == false) {
    push();
    textSize(24);
    noStroke();
    fill(255);
    text("Click & Make Noise", windowWidth / 9, windowHeight * 0.75);
    pop();
  }


  var finishLine = new CreateFinishLine();
  finishLine.display();

  //player
  player = new CreatePlayer(playerX, playerY, windowHeight / 18);
  player.display();

  //barriers
  for (var i = 0; i < allMyBarriers.length; i++) {
    var tempBarrier = allMyBarriers[i];
    tempBarrier.display();
    tempBarrier.collide();
  }

  //player: gravity & x movement
  if (startGame == true) {
    playerX += 1;

    playerY += 3;
    playerY -= 150 * volume;
  }

  if (gameover == true) {
    push();
    background(200, 0, 0);
    textSize(30);
    noStroke();
    fill(255);
    text("Game Over", windowWidth / 2, windowHeight / 2);
    pop();
  }

  //finish
  if (player.x >= finishLine.x) {
    youWin = true;
  }


  if (player.x >= windowWidth * 0.95) {
    youWin = true;
  }


  if (youWin == true) {
    push();
    background(0, 200, 0);
    textSize(30);
    noStroke();
    fill(255);
    text("You Win", windowWidth / 2, windowHeight / 2);
    pop();
  }
}

function CreatePlayer(_x, _y, _r) {
  this.x = _x;
  this.y = _y;
  this.r = _r;

  this.color = "red";
  this.strokeWeight = 1;

  this.display = function() {
    noFill();
    stroke(this.color);
    ellipse(this.x, this.y, this.r);
  }
}

function CreateBarrier(_x, _y) {
  this.x = _x;
  this.y = windowHeight*0.7;
  this.y1 = _y + 100;
  this.y2 = _y - 100 - windowHeight;

  this.color = 125;

  this.width = windowWidth / 20;
  this.height = windowHeight;

  this.display = function() {
    push();
    noFill();
    stroke(this.color);
    strokeWeight(1)
    translate(0, windowHeight / 2);
    rect(this.x, this.y1, this.width, this.height);
    rect(this.x, this.y2, this.width, this.height);
    pop();
  }

//clean
  this.collide2 = function() {
    //if (this.x > player.x + player.width / 2 && this.x+this.width < player.x - player.width/2) {
    //if(this.x < player.x + player.width/2  && this.x+this.width > player.x - player.width/2) {
    if (player.x + player.r / 2 < this.x || player.x - player.r / 2 > this.x + this.width) {} else {
      if (player.y + player.r / 2 < this.y || player.y - player.r / 2 > this.y + this.height) {} else {
        console.log("gameover");
        gameover = true;
      }
    }
  }

  this.collide3 = function() {
    if ((player.x + player.r / 2 > this.x) && (player.x - player.r / 2 < this.x + this.width)) {
      if ((player.y + player.r / 2 > this.y) && (player.y - player.r / 2 < this.y + this.height)) {
        console.log("gameover");
        gameover = true;
      }
    }
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  this.collide = function() {
    //if ((player.x + player.r / 2 > this.x) && (player.x - player.r / 2 < this.x + this.width) && (player.y + player.r / 2 > this.y) && (player.y - player.r / 2 < this.y + this.height)) {
      if(player.x + player.r / 2 > this.x && player.x - player.r / 2 < this.x + this.width) {
        if(player.y > windowHeight/2 + 100 || player.y < windowHeight/2 - 100) {
        console.log("gameover");
        gameover = true;
      }
    }
  }
}

//clean
function CreateFinishLine() {
  this.display = function() {
    push();
    fill(255);
    rect(15, windowHeight, windowWidth * 0.9, 0);
    pop();
  }
}
/////////////////////////////////////////////////////
function mouseClicked() {
  if (gameover == false) {
    if (startGame == false) {
      startGame = true;
    } else {
      startGame = false;
    }
  } else {
    location = location;
  }

  if (youWin == true) {
    location = location;
  }
}
