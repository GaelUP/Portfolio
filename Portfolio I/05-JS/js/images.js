/**
 * This is a piece of code written in an older version of JS.
 * Modern versions of JS use other means to create functions.
 * This code is provided so you can get a glimpse of the old ways. Don't worry too much about all the code, and try just to focus on the TODO parts.
 */
// Global variable myGamePiece that will be of type component.
var myGamePiece;

--function startGame() {
  myGamePiece = new component(30, 30, "./images/smiley.gif", 10, 120, "image");
  myGameArea.start();
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx = myGameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.newPos = function (canvasWidth, canvasHeight) {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x + this.width > canvasWidth) {
      this.x = canvasWidth - this.width;
      this.speedX = 0;
    }
    if (this.x < 0) {
      this.x = 0;
      this.speedX = 0;
    }
    if (this.y + this.height > canvasHeight) {
      this.y = canvasHeight - this.height;
      this.speedY = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.speedY = 0;
    }
  };
}

function updateGameArea() {
  myGameArea.clear();
  myGamePiece.newPos(myGameArea.canvas.width, myGameArea.canvas.height);
  myGamePiece.update();
}

function moveup() {
  myGamePiece.speedY = -1;
}

function movedown() {
  myGamePiece.speedY = 1;
}

function moveleft() {
  myGamePiece.speedX = -1;
}

function moveright() {
  myGamePiece.speedX = 1;
}

function clearmove() {
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
}