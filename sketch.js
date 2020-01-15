// global variables
var mic;
var volume;

var playerX;
var playerY;
// array of colors for the player
var coloreArray = ["red", "yellow", "green", "pink", "blue", "orange", "white"];
// index for coloreArray
var colore = 0;

// game status global variables
var startGame = false;
var gameover = false;
var youWin = false;

// barriers global variables
var allMyBarriers = [];
var amountOfBarriers = 8;

function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //set microphone input
  mic = new p5.AudioIn();
  mic.start();

  //player starting position X & Y
  playerY = windowHeight * 0.4;
  playerX = 25;

  //barriers creation
  for (var i = 0; i < amountOfBarriers; i++) {
    var tempx = windowWidth / 10 + i * windowWidth / 10;
    var tempy = 0;

    var tempBarrier = new CreateBarrier(tempx, tempy);
    allMyBarriers.push(tempBarrier);
  }
  //info gameplay
  text1 = createDiv("CLICK to start/pause <br> MAKE NOISE to play <br> Press SPACEBAR to change color");
  text1.style("user-select: none; position: absolute; top: 85%; left: 10%; color: white; text-align: left; font-family: 'Source Code Pro'; font-size: 1vw");
  text1.hide();
}

function draw() {
  volume = mic.getLevel();

  background(0);

  // instruction text visible / invisible
  if (startGame == false) {
    text1.show();
  }
  if (startGame == true || gameover == true || youWin == true) {
    text1.hide();
  }


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
    // gravity makes player fall
    playerY += 3;
    // sound makes player rise
    playerY -= 150 * volume;
  }

  //Screen Game Over
  if (gameover == true) {
    push();
    background(200, 0, 0);
    textSize(30);
    noStroke();
    fill(255);
    textAlign(CENTER);
    textFont('Source Code Pro');
    text("Game Over", windowWidth / 2, windowHeight / 2);
    pop();
    noLoop();
  }

  //Finish line
  if (player.x >= windowWidth * 0.95) {
    youWin = true;
  }

  //Screen You Win
  if (youWin == true) {
    push();
    background(0, 200, 0);
    textSize(30);
    noStroke();
    fill(255);
    textAlign(CENTER);
    textFont('Source Code Pro');
    text("You Win", windowWidth / 2, windowHeight / 2);
    pop();
  }
}

// player object
function CreatePlayer(_x, _y, _r) {
  this.x = _x;
  this.y = _y;
  this.r = _r;

  this.color = coloreArray[colore];
  this.strokeWeight = 1;

  this.display = function() {
    noFill();
    stroke(this.color);
    ellipse(this.x, this.y, this.r);
  }
}

// barriers object
function CreateBarrier(_x, _y) {
  this.x = _x;
  this.y = windowHeight * 0.7;
  this.y1 = _y + 125;
  this.y2 = _y - 125 - windowHeight;

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

  // set collision between player and barriers
  this.collide = function() {
    if (player.x + player.r / 2 > this.x && player.x - player.r / 2 < this.x + this.width) {
      if (player.y > windowHeight / 2 + 125 || player.y < windowHeight / 2 - 125) {
        console.log("gameover");
        gameover = true;
      }
    }
  }
}


function mouseClicked() {
  if (gameover == false) {
    // mouseclick play-pause the game if gameover is false
    if (startGame == false) {
      startGame = true;
    } else {
      startGame = false;
    }
  } else {
    // refresh the page if gameover is true
    location = location;
  }

  // refresh the page if the player has won
  if (youWin == true) {
    location = location;
  }
}

// keyboard input
function keyPressed() {
  if (keyCode === 32) {
    // SPACEBAR generates a random number to change index in coloreArray and change player color
    colore = round(random(0, 6));
    return false;
  }
}

//resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
