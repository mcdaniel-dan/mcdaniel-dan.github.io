var stage = document.getElementById('stage');
var rack = ""; //to store letters for word making
var latestWord = "Wubbles";
var latestDef = "A mobile word bubble game created for CS261!";
var score = 0;

var browserX = window.screenX;
var browserY = window.screenY;
var balls = [];
var volleySize = 1; //number of balls generated
var maxBalls = 10;
var currentDrag = null;
var mouseX = 0;
var mouseY = 0;

//var stageWidth = $(document).width();   //jQuery
var stageWidth = getDocWidth();           //Pure JS

//var stageHeight = $(document).height(); //jQuert
var stageHeight = getDocHeight();					//Pure JS

stage.width = stageWidth;
stage.height = stageHeight;

document.addEventListener(Event.MOUSEMOVE, getMouseXY, false);
document.onmousemove = getMouseXY;

window.onresize = function(event) {
  stage.width = 10;
  stage.height = 10;
  stageWidth = $(document).width();
  stageHeight = $(document).height();
  stage.width = stageWidth;
  stage.height = stageHeight;
}

generateBalls(0,0);

var drawingCanvas = document.getElementById('stage');
if(drawingCanvas.getContext) {
  var context = drawingCanvas.getContext('2d');
  setInterval(render, 20);
}

//Todo: Convert to Pure JS
jQuery(document).ready(function()
{
  //Pure JS
  stage.onmousedown  = function (e) { onMouseDown(); }
  stage.onmouseup    = function (e) { onMouseUp();   }
  stage.ontouchstart = function (e) { onMouseDown(); }
  stage.ontouchend   = function (e) { onMouseUp();   }
})

//todo: handle clicking on words
function onMouseDown() {
  // var dx = mouseX - rack.x;
  // var dy = mouseY - rack.y;

  //letter picking
  var j = balls.length; //array of balls
  while(--j > -1) {
    var dx = mouseX - balls[j].x;
    var dy = mouseY - balls[j].y;
    var dist = Math.sqrt(dx * dx + dy * dy);

    //if(dist < balls[j].size/2) { //detect ball touches
    if(dist < balls[j].size) { //detect ball touches
      currentDrag = balls[j];
      currentDrag.dragging = true;
      rack += currentDrag.letters[0]; //add letter to rack
      balls.splice(j,1); //remove from balls
      return;
    }
  }
  //word submissions
  if (mouseY >= stageHeight - 50) { //click in the rack
    checkWord(rack);
    rack = ""; //clear word
    generateBalls(mouseX, mouseY);
  }
}

function onMouseUp() {
  if(currentDrag != null) currentDrag.dragging = false;
}

function generateBalls(mX, mY) {
  if (balls.length < maxBalls) {
    for(var i = 0; i < volleySize; i++)	{
      var ball = {}; //ball object
      ball.letters = [ generateLetter() ];
      ball.color = generateColor();
      ball.bounce = .5 + (Math.random() * .5);
      ball.vx = Math.random() * 50 - 25;
      ball.vy = Math.random() * 50 - 25;
      //ball.size = 45 - (ball.bounce * 25); //original size
      ball.size = 50; //fixed ball size

      ball.x = Math.random() * stageWidth;
      ball.y = Math.random() * stageHeight;
      //					 ball.x = (mX) ? (mX + Math.random() * 4) : (Math.random() * stageWidth);
      //					 ball.y = (mY) ? (mY + Math.random() * 4) : (Math.random() * stageHeight);
      balls[balls.length] = ball;
    }
  }
}

function combineObjects(obj1, obj2) {
  //merge
  if (obj1.letters.length + obj2.letters.length <= 7) {
    for (letter in obj2.letters)
      obj1.letters.push(letter);

  //remove
  var j = balls.length; //array of balls
  while(--j > -1) {
    if(obj2.x == balls[j].x && obj2.y == balls[j].y) {
      balls.splice(j,1); //remove from balls
      return true;
    }
  }
}
return false; //unable to merge - too big
}

//generates random color
function generateColor()
{
  color="#"
  for (i = 0; i < 6; i++) {
    color += "0123456789abcdef".charAt(Math.round(Math.random()*8)); //8 excludes light colors
  }
  return color;
  //return "red";
}

function scoreWord(word) {
  return Math.pow(word.length,2);
}

//generates random color
function generateLetter() {
  return "aaaaaaaabcccddddeeeeeeeeeeeeeffgghhhhhhiiiiiiijkllllmmnnnnnnnooooooooppqrrrrrrsssssstttttttttuuuvwwxyyz".charAt(Math.round(Math.random()*103));
}

function render() {
  var isChange = (browserX != window.screenX || browserY != window.screenY);
  if(isChange) {
    var diffX = browserX - window.screenX;
    browserX = window.screenX;

    var diffY = browserY - window.screenY;
    browserY = window.screenY;
  }

  var j = balls.length;
  while(--j > -1) {
    update(balls[j]);

    if(isChange) {
      balls[j].vx += (diffX * .05);
      balls[j].vy += (diffY * .1);
    }
  }

  draw();
}

function draw() {
  generateBalls(); //generate new balls if necesary
  context.clearRect(0, 0, stageWidth, stageHeight); //clear screen

  //write background
  context.font = "2em Verdana";
  context.textAlign = "left";
  context.textBaseline = "top";
  context.fillStyle = "lightGray";
  context.fillText("Score: " + score, 20, stageHeight - 50);
  //context.fillText(latestWord + " - " + latestDef, 20, 20);
  writeDef();

  //Draw Balls
  var i = balls.length;
  context.font = "2em Verdana";
  while(--i > -1) {
    drawBall(balls[i]);
  }

  //Draw letter rack
  //TODO: Use context.measureText(text).width to measure rack area.
  context.font = "2em Verdana";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "white";
  context.fillText(rack, stageWidth / 2, stageHeight - 30);
  //var domRect = element.getBoundingClientRect(); //???
}

function drawBall(ball) {
  // Create gradient for ball fill
  var gradient = context.createRadialGradient(ball.x, ball.y, 5, ball.x + 5, ball.y + 5, 100);
  gradient.addColorStop(0, ball.color);
  gradient.addColorStop(.5, "transparent");
  gradient.addColorStop(1, ball.color);
  context.fillStyle = gradient;

  //Ball
  context.beginPath();
  context.arc(ball.x, ball.y, ball.size, 0, Math.PI*2, true);
  //context.fillStyle = balls[i].color; //solid color
  //context.fillStyle = "green"; //for debug
  context.fill();

  //Letter
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "white";
  context.fillText(ball.letters[0], ball.x, ball.y - 2); //shift letters up slightly
  //context.fillText(ball.letters.length, ball.x, ball.y - 2); //shift letters up slightly
}

function update(ball) {
  collisionCheck();

  // var gravity = 0.25; //original gravity
  // var drag = .98; //original drag

  var gravity = 0; // no gravity
  var drag = .99;//.9999999; //very little resistence

  if(ball.dragging) {
    ball.vx = ball.x - ball.ox;
    ball.vy = ball.y - ball.oy;
    ball.ox = ball.x;
    ball.oy = ball.y;

    ball.x = mouseX;
    ball.y = mouseY;

    if ((ball.x + ball.size) > stageWidth) {
      ball.x = stageWidth - ball.size;
    } else if((ball.x - ball.size) < 0) {
      ball.x = 0 + ball.size;
    }

    if ((ball.y + ball.size) > stageHeight) {
      ball.y = stageHeight - ball.size;
    } else if((ball.y - ball.size) < 0) {
      ball.y = 0 + ball.size;
    }
  } else {
    ball.x += ball.vx;
    ball.y += ball.vy;

    if ((ball.x + ball.size) > stageWidth) {
      ball.x = stageWidth - ball.size;
      ball.vx = -ball.vx * ball.bounce;
    }
    else if((ball.x - ball.size) < 0) {
      ball.x = 0 + ball.size;
      ball.vx = -ball.vx * ball.bounce;
    }

    if ((ball.y + ball.size) > stageHeight) {
      ball.y = stageHeight - ball.size;
      ball.vy = -ball.vy * ball.bounce;
    }
    else if((ball.y - ball.size) < 0) {
      ball.y = 0 + ball.size;
      ball.vy = -ball.vy * ball.bounce;
    }

    ball.vx = ball.vx * drag;
    ball.vy = ball.vy * drag + gravity;
  }
}

//todo: code stickyness
function collisionCheck()
{
  var spring = .5;

  for(var i = 0; i < (balls.length-1); ++i) //iterate through all balls
  {
    var ball0 = balls[i]; //grab a ball

    for(var j = i + 1; j < balls.length; ++j) //check it against all other balls
    {
      var ball1 = balls[j]; //get a second ball to test against
      var dx = ball1.x - ball0.x; //see how far apart they are
      var dy = ball1.y - ball0.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var minDist = ball0.size + ball1.size; //caluclate what distance constitutes a collision

      if(dist < minDist) { //if we have a collision
        //try to combine objects
        if (!combineObjects(ball0, ball1)) {
          //var angle = Math.atan2(dy, dx);
          var tx = ball0.x + dx / dist * minDist;
          var ty = ball0.y + dy / dist * minDist;
          var ax = (tx - ball1.x);
          var ay = (ty - ball1.y);


          ball0.x -= ax;
          ball0.y -= ay;

          ball1.x += ax;
          ball1.y += ay;


          ball0.vx -= (ax * spring);
          ball0.vy -= (ay * spring);
          ball1.vx += (ax * spring);
          ball1.vy += (ay * spring);
        } else {
          //combine momentum
        }
      }
    }
  }
}

function getMouseXY(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;

  if (mouseX < 0) { mouseX = 0; }
  if (mouseY < 0) { mouseY = 0; }

  return true;
}

function checkWord(word) {
  var url = "https://api.wordnik.com/v4/word.json/" + word + "/definitions?limit=1&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var defs = JSON.parse(this.responseText);
      if (defs.length == 0) {
        //alert("bad");
        latestWord = word;
        latestDef = 'a "word" you just made up';

        score -= scoreWord(word);

        return false;
      } else {
        //alert("good");
        latestWord = word;
        latestDef = defs[0].text;

        score += scoreWord(word);

        return true;
      }
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function writeDef() {

  var text = latestWord + " - " + latestDef,
  fontSize = 36,
     width = stageWidth,
     lines = [],
      line = '',
  lineTest = '',
     words = text.split(' '),
  currentY = 0;

  context.font = '2em Arial';

  for (var i = 0, len = words.length; i < len; i++) {
    lineTest = line + words[i] + ' ';

    // Check total width of line or last word
    if (context.measureText(lineTest).width > width) {
      // Calculate the new height
      currentY = lines.length * fontSize + fontSize;

      // Record and reset the current line
      lines.push({ text: line, height: currentY });
      line = words[i] + ' ';
    } else { line = lineTest; }
  }

  // Catch last line in-case something is left over
  if (line.length > 0) {
    currentY = lines.length * fontSize + fontSize;
    lines.push({ text: line.trim(), height: currentY });
  }

  // Visually output text
  context.clearRect(0, 0, 500, 500);
  for (var i = 0, len = lines.length; i < len; i++) {
    context.fillText(lines[i].text, 20, 10 + lines[i].height);
  }
}

function getDocWidth() {
  var w = window;
  d = document;
  e = d.documentElement;
  b = d.getElementsByTagName('body')[0];
  x = w.innerWidth || e.clientWidth || b.clientWidth;
  return x;
}

function getDocHeight() {
  var w = window;
  d = document;
  e = d.documentElement;
  b = d.getElementsByTagName('body')[0];
  y = w.innerHeight || e.clientHeight || b.clientHeight;
  return y;
}
