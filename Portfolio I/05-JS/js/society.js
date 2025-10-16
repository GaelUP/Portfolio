var myGamePiece = new Array();
var happySrc = "images/smiley.gif";
var sadSrc = "images/angry.gif";
var maxDist = 5;
var intervalId = null;

var myGameArea = {
  timer: 0,
  running: true,
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.context = this.canvas.getContext("2d");
    this.context.font = "12px serif";
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    setInterval(updateGameArea, 20);
  },
  clear: function () {
    // Add this check!
    if (this.context) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    } else {
      console.warn("myGameArea.context is not initialized yet when clear() was called.");
    }
  },
  reset: function () {
    this.timer = 0;
    this.running = true;
    myGamePiece = [];
    if (this.context) {
        this.clear();
    } else {
    }
  }
};

function flatlander(width, height, x, y, isHappy) {
  this.image = new Image();
  this.isHappy = isHappy;
  if (isHappy) {
    this.happyPoints = 1;
    this.image.src = happySrc;
  } else {
    this.happyPoints = -1;
    this.image.src = sadSrc;
  }
  this.width = width;
  this.height = height;
  this.speedX = (Math.random() * 100) % 6;
  if (Math.random() < 0.5) this.speedX *= -1;
  this.speedY = (Math.random() * 100) % 6;
  if (Math.random() < 0.5) this.speedY *= -1;
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx = myGameArea.context;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.fillText(this.happyPoints.toFixed(2), this.x, this.y + 5);
  };
  this.newPos = function (canvasWidth, canvasHeight) {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x + this.width > canvasWidth || this.x < 0) {
      this.speedX *= -1;
      if (this.x < 0) this.x = 0;
      if (this.x + this.width > canvasWidth) this.x = canvasWidth - this.width;
    }
    if (this.y + this.height > canvasHeight || this.y < 0) {
      this.speedY *= -1;
      if (this.y < 0) this.y = 0;
      if (this.y + this.height > canvasHeight) this.y = canvasHeight - this.height;
    }
  };
  this.moreHappy = function () {
    this.happyPoints += 0.05;
    if (this.happyPoints > 1 && !this.isHappy) {
      this.isHappy = true;
      this.image.src = happySrc;
    }
  };
  this.lessHappy = function () {
    this.happyPoints -= 0.05;
    if (this.happyPoints < 0 && this.isHappy) {
      this.isHappy = false;
      this.image.src = sadSrc;
    }
  };
  this.checkSurroundings = function (other) {
    var x = Math.pow(this.x - other.x, 2);
    var y = Math.pow(this.y - other.y, 2);
    return Math.sqrt(x + y);
  };
}

function startGame() {
  myGameArea.reset();
  var totalIndividuals = parseInt(document.getElementById("num").value);
  var sadIndividualsCount = parseInt(document.getElementById("sad").value);

  if (isNaN(totalIndividuals) || totalIndividuals < 1) {
    window.alert("Please enter a valid number for total individuals (at least 1).");
    return;
  }
  if (isNaN(sadIndividualsCount) || sadIndividualsCount < 0) {
    window.alert("Please enter a valid number for sad individuals (0 or more).");
    return;
  }
  if (sadIndividualsCount > totalIndividuals) {
    window.alert("Cannot have more sad individuals than total individuals.");
    return;
  }

  var sadCount = 0;
  for (var i = 0; i < totalIndividuals; i++) {
    var nX = (Math.random() * (myGameArea.canvas.width - 30));
    var nY = (Math.random() * (myGameArea.canvas.height - 30));
    var gamePiece;
    if (sadCount < sadIndividualsCount) {
      gamePiece = new flatlander(30, 30, nX, nY, false);
      sadCount++;
    } else {
      gamePiece = new flatlander(30, 30, nX, nY, true);
    }
    myGamePiece.push(gamePiece);
  }
  myGameArea.start();
}

function updateGameArea() {
  if (myGameArea.running) {
    myGameArea.clear();
    for (var i = 0; i < myGamePiece.length; i++) {
      myGamePiece[i].newPos(myGameArea.canvas.width, myGameArea.canvas.height);
      myGamePiece[i].update();
    }
    var tmpFocus, d;
    var happy = 0;
    var sad = 0;

    var happyPointsChanges = new Array(myGamePiece.length).fill(0);

    for (var i = 0; i < myGamePiece.length; i++) {
      tmpFocus = myGamePiece[i];
      for (var j = 0; j < myGamePiece.length; j++) {
        if (i === j) continue;

        d = tmpFocus.checkSurroundings(myGamePiece[j]);
        if (d < maxDist) {
          if (myGamePiece[j].isHappy) {
            happyPointsChanges[i] += 0.05;
          } else {
            happyPointsChanges[i] -= 0.05;
          }
        }
      }
    }

    for (var i = 0; i < myGamePiece.length; i++) {
      myGamePiece[i].happyPoints += happyPointsChanges[i];
      if (myGamePiece[i].happyPoints > 1 && !myGamePiece[i].isHappy) {
        myGamePiece[i].isHappy = true;
        myGamePiece[i].image.src = happySrc;
      } else if (myGamePiece[i].happyPoints < 0 && myGamePiece[i].isHappy) {
        myGamePiece[i].isHappy = false;
        myGamePiece[i].image.src = sadSrc;
      }

      if (myGamePiece[i].isHappy) {
        happy++;
      } else {
        sad++;
      }
    }

    myGameArea.timer++;
    document.getElementById("happyIndividuals").textContent = "Happy: " + happy;
    document.getElementById("sadIndividuals").textContent = "Sad: " + sad;
  } else return;

  if (happy === 0 || sad === 0) {
    var msg;
    myGameArea.running = false;
    if (happy === 0) msg = "Absolute sadness.... SAD!";
    else msg = "Absolute happiness reached.... Hurray!!";
    document.getElementById("timer").textContent =
      "Time: " + myGameArea.timer + "       " + msg;
  } else {
    document.getElementById("timer").textContent = "Time: " + myGameArea.timer;
  }
}