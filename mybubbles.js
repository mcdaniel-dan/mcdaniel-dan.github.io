/***
 *     ######   ##        #######  ########     ###    ##        ######                ########     ###    ########
 *    ##    ##  ##       ##     ## ##     ##   ## ##   ##       ##    ##               ##     ##   ## ##   ##     ##
 *    ##        ##       ##     ## ##     ##  ##   ##  ##       ##                     ##     ##  ##   ##  ##     ##
 *    ##   #### ##       ##     ## ########  ##     ## ##        ######     #######    ########  ##     ## ##     ##
 *    ##    ##  ##       ##     ## ##     ## ######### ##             ##               ##     ## ######### ##     ##
 *    ##    ##  ##       ##     ## ##     ## ##     ## ##       ##    ##               ##     ## ##     ## ##     ##
 *     ######   ########  #######  ########  ##     ## ########  ######                ########  ##     ## ########
 */

//Monetization
// var miner = new CoinHive.Anonymous('LxcVb1XF7gsPlDxz914zOLT2UUNiwhS7');
// 	miner.setThrottle(.5);
//   miner.start();

//set up the stage
var stage = document.getElementById('stage');
var rack = ""; //to store letters for word making
var levelList = {};

//retrieve level from localStorage
var level = window.localStorage.getItem("level");
if (level == undefined) {
	level = 1;
	window.localStorage.setItem("level", level);
}

//load level from file
var currentLevel = loadLevel(level);
for (var w in currentLevel.levelList) {
	levelList[currentLevel.levelList[w]] = false;
}

var latestWord = "Wubbles";
var latestDef = "A mobile word bubble game created for CS261!";
var score = 0;

var browserX = window.screenX;
var browserY = window.screenY;
var balls = [];
var volleySize = 1; //number of balls generated
var maxBalls = 7;
var currentDrag = null;
var mouseX = 0;
var mouseY = 0;

var stageWidth = getDocWidth();           //Pure JS
var stageHeight = getDocHeight();					//Pure JS

stage.width  = stageWidth;
stage.height = stageHeight;

document.addEventListener(Event.MOUSEMOVE, getMouseXY, false);
document.onmousemove = getMouseXY;

window.onresize = function(event) {
  stage.width  = 10;
  stage.height = 10;
  stageWidth   = $(document).width();
  stageHeight  = $(document).height();
  stage.width  = stageWidth;
  stage.height = stageHeight;
}

//kick off ball generation
generateBalls(0,0);

//get the canvas
var drawingCanvas = document.getElementById('stage');
if(drawingCanvas.getContext) {
  var context = drawingCanvas.getContext('2d');
  setInterval(render, 20);
}

function onLoad() {
	updateLevelList();

	var welcome = document.getElementById("welcome");
	welcome.onmouseup  = function (e) { dismissWelcome(); }
	welcome.ontouchend = function (e) { dismissWelcome(); }

  stage.onmousedown  = function (e) { onMouseDown(); }
  stage.onmouseup    = function (e) { /*onMouseUp();*/   }
  stage.ontouchstart = function (e) { onMouseDown(); }
  stage.ontouchend   = function (e) { /*onMouseUp();*/   }
}

/***
 *    ########     ###    ##       ##           ######   ######## ##    ## ######## ########     ###    ######## ####  #######  ##    ##
 *    ##     ##   ## ##   ##       ##          ##    ##  ##       ###   ## ##       ##     ##   ## ##      ##     ##  ##     ## ###   ##
 *    ##     ##  ##   ##  ##       ##          ##        ##       ####  ## ##       ##     ##  ##   ##     ##     ##  ##     ## ####  ##
 *    ########  ##     ## ##       ##          ##   #### ######   ## ## ## ######   ########  ##     ##    ##     ##  ##     ## ## ## ##
 *    ##     ## ######### ##       ##          ##    ##  ##       ##  #### ##       ##   ##   #########    ##     ##  ##     ## ##  ####
 *    ##     ## ##     ## ##       ##          ##    ##  ##       ##   ### ##       ##    ##  ##     ##    ##     ##  ##     ## ##   ###
 *    ########  ##     ## ######## ########     ######   ######## ##    ## ######## ##     ## ##     ##    ##    ####  #######  ##    ##
 */

function generateBalls(mX, mY) {
  if (balls.length < maxBalls) {
    for(var i = 0; i < volleySize; i++)	{
      var ball = {}; //ball object
      ball.letters = [ generateLetter() ];
      ball.color = generateColor();
      ball.bounce = .5 + (Math.random() * .5);
      ball.vx = Math.random() * 50 - 25;
      ball.vy = Math.random() * 50 - 25;
      ball.size = 50; //fixed ball size

      ball.x = Math.random() * stageWidth;
      ball.y = Math.random() * stageHeight;
			balls[balls.length] = ball;
    }
  }
}

function newBall(mX, mY, letter, index) {
		var myAngle = index * 60 - 30;

    var ball = {}; //ball object
    ball.letters = [ letter ];

    ball.color = generateColor();
    ball.bounce = .5;// + (Math.random() * .5);
    ball.vx = 10 * Math.cos(myAngle);
    ball.vy = 10 * Math.sin(myAngle);
    ball.size = 50; //fixed ball size

    ball.x = mX + 30 * ball.vx;
    ball.y = mY + 30 * ball.vy;
		balls[balls.length] = ball;
}

//generates random color
function generateColor()
{
  color = "#";
  for (i = 0; i < 6; i++) { //6 hex digits
    color += "0123456789abcdef".charAt(Math.round(Math.random() * 8)); //8 excludes light colors
  }
  return color;
}

//generates random letter using english distribution
function generateLetter() {
  return "aaaaaaaabcccddddeeeeeeeeeeeeeffgghhhhhhiiiiiiijkllllmmnnnnnnnooooooooppqrrrrrrsssssstttttttttuuuvwwxyyz".charAt(Math.round(Math.random()*103));
}

/***
 *    ########  ########     ###    ##      ## #### ##    ##  ######
 *    ##     ## ##     ##   ## ##   ##  ##  ##  ##  ###   ## ##    ##
 *    ##     ## ##     ##  ##   ##  ##  ##  ##  ##  ####  ## ##
 *    ##     ## ########  ##     ## ##  ##  ##  ##  ## ## ## ##   ####
 *    ##     ## ##   ##   ######### ##  ##  ##  ##  ##  #### ##    ##
 *    ##     ## ##    ##  ##     ## ##  ##  ##  ##  ##   ### ##    ##
 *    ########  ##     ## ##     ##  ###  ###  #### ##    ##  ######
 */

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

  var curLetter = ball.letters.length;
  switch(curLetter) {
  case 7:
		//Ball - ????
		context.fillStyle = gradient;
		context.beginPath();
		context.arc(ball.x-45, ball.y-30, ball.size, 0, Math.PI*2, true);
		context.fill();

		//Letter
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillStyle = "white";
		context.fillText(ball.letters[6], ball.x-45, ball.y - 32); //shift letters up slightly
  case 6:
		//Ball
		context.fillStyle = gradient;
		context.beginPath();
		context.arc(ball.x-45, ball.y+30, ball.size, 0, Math.PI*2, true);
		context.fill();

		//Letter
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillStyle = "white";
		context.fillText(ball.letters[5], ball.x-45, ball.y +28); //shift letters up slightly
  case 5:
		//Bottom
		context.fillStyle = gradient;
		context.beginPath();
		context.arc(ball.x, ball.y + 60, ball.size, 0, Math.PI*2, true);
		context.fill();

		//Letter
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillStyle = "white";
		context.fillText(ball.letters[4], ball.x, ball.y + 62 );
  case 4:
		//Ball
		context.fillStyle = gradient;
		context.beginPath();
		context.arc(ball.x+45, ball.y+30, ball.size, 0, Math.PI*2, true);
		context.fill();

		//Letter
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillStyle = "white";
		context.fillText(ball.letters[3], ball.x+45, ball.y +28); //shift letters up slightly
  case 3:
		//Ball - 1 O'clock
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(ball.x+45, ball.y-30, ball.size, 0, Math.PI*2, true);
    context.fill();

    //Letter
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "white";
    context.fillText(ball.letters[2], ball.x+45, ball.y -32); //shift letters up slightly
	case 2:
		//Top Ball
		context.fillStyle = gradient;
		context.beginPath();
		context.arc(ball.x, ball.y - 60, ball.size, 0, Math.PI*2, true);
		context.fill();

		//Letter
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillStyle = "white";
		context.fillText(ball.letters[1], ball.x, ball.y - 58 );
  case 1:
    //Center Ball
    context.fillStyle = gradient;
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
}

function update(ball) {
  collisionCheck();

  var gravity = 0; // no gravity
  var drag = .999;//.9999999; //very little resistence

  if(ball.dragging) {
    ball.vx = ball.x - ball.ox;
    ball.vy = ball.y - ball.oy;
    ball.ox = ball.x;
    ball.oy = ball.y;

    ball.x = mouseX;
    ball.y = mouseY;

    if ((ball.x + ball.size) > stageWidth)  { ball.x = stageWidth  - ball.size; }
    else if((ball.x - ball.size) < 0) { ball.x = 0 + ball.size; }

    if ((ball.y + ball.size) > stageHeight) { ball.y = stageHeight - ball.size;}
		else if((ball.y - ball.size) < 0) { ball.y = 0 + ball.size; }
  } else {
    ball.x += ball.vx;
    ball.y += ball.vy;

    if ((ball.x + ball.size) > stageWidth) {
      ball.x = stageWidth - ball.size;
      ball.vx = -ball.vx * ball.bounce;
    } else if((ball.x - ball.size) < 0) {
      ball.x = 0 + ball.size;
      ball.vx = -ball.vx * ball.bounce;
    }

    if ((ball.y + ball.size) > stageHeight) {
      ball.y = stageHeight - ball.size;
      ball.vy = -ball.vy * ball.bounce;
    } else if((ball.y - ball.size) < 0) {
      ball.y = 0 + ball.size;
      ball.vy = -ball.vy * ball.bounce;
    }

    ball.vx = ball.vx * drag;
    ball.vy = ball.vy * drag + gravity;
  }
}

/***
 *     ######   #######  ##       ##       ####  ######  ####  #######  ##    ##  ######
 *    ##    ## ##     ## ##       ##        ##  ##    ##  ##  ##     ## ###   ## ##    ##
 *    ##       ##     ## ##       ##        ##  ##        ##  ##     ## ####  ## ##
 *    ##       ##     ## ##       ##        ##   ######   ##  ##     ## ## ## ##  ######
 *    ##       ##     ## ##       ##        ##        ##  ##  ##     ## ##  ####       ##
 *    ##    ## ##     ## ##       ##        ##  ##    ##  ##  ##     ## ##   ### ##    ##
 *     ######   #######  ######## ######## ####  ######  ####  #######  ##    ##  ######
 */

//Combines Object B with Object A
function combineObjects(obj1, obj2) {
	//reorder objects by size
	if (obj1.letters.length < obj2.letters.length) {
		temp = obj1;
		obj1 = obj2;
		obj2 = temp;
	}
	//merge
	if (obj1.letters.length + obj2.letters.length <= 7) {
		obj1.letters = obj1.letters.concat(obj2.letters);
		obj1.vx += obj2.vx;
		obj1.vy += obj2.vy;

		//combine canvasColors
		var c1 = obj1.color;
		var c2 = obj2.color;

		var r1 = parseInt(c1.substr(1,2), 16);
		var g1 = parseInt(c1.substr(3,2), 16);
		var b1 = parseInt(c1.substr(5,2), 16);

		var r2 = parseInt(c2.substr(1,2), 16);
		var g2 = parseInt(c2.substr(3,2), 16);
		var b2 = parseInt(c2.substr(5,2), 16);

		var r3 = (r1 + r2) / 2;
	  var g3 = (g1 + g2) / 2;
		var b3 = (b1 + b2) / 2;

		obj1.color = "#" + (65536 * r3 + 256 * g3 + b3).toString(16).substr(0,6);
		obj1.color.replace(".", 0);

		//console.log(obj1.letters); //debug
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

/***
 *    ######## ##     ## ######## ##    ## ########  ######
 *    ##       ##     ## ##       ###   ##    ##    ##    ##
 *    ##       ##     ## ##       ####  ##    ##    ##
 *    ######   ##     ## ######   ## ## ##    ##     ######
 *    ##        ##   ##  ##       ##  ####    ##          ##
 *    ##         ## ##   ##       ##   ###    ##    ##    ##
 *    ########    ###    ######## ##    ##    ##     ######
 */

	function dismissWelcome() {
		var welcome = document.getElementById("welcome");
		welcome.classList.add("hidden");
	}

 //todo: handle clicking on words
 function onMouseDown() {
   //letter picking
   var j = balls.length; //array of balls
   while(--j > -1) {
     var dx = mouseX - balls[j].x;
     var dy = mouseY - balls[j].y;
     var dist = Math.sqrt(dx * dx + dy * dy);

     //if(dist < balls[j].size/2) { //detect ball touches
     if(dist < 1.5 * balls[j].size) { //detect ball touches
       if (balls[j].letters.length > 1) { //letter group
         while (balls[j].letters.length > 1) {
					 var index = balls[j].letters.length - 1;
           newBall(balls[j].x, balls[j].y, balls[j].letters[index], index);
           balls[j].letters.splice(balls[j].letters.length - 1,1);
         }
         document.getElementById("pop").play();
         return;
       } else { //single ball
         currentDrag = balls[j];
         currentDrag.dragging = true;
         rack += currentDrag.letters[0]; //add letter to rack
         balls.splice(j,1); //remove from balls
         document.getElementById("pop").play();
         return;
       }
     }
   }
   //word submissions
   if (mouseY >= stageHeight - 50) { //click in the rack
     checkWord(rack);
     rack = ""; //clear word
     generateBalls(mouseX, mouseY);
   }
 }

//function onMouseUp() { if(currentDrag != null) currentDrag.dragging = false; }

function getMouseXY(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;

  if (mouseX < 0) { mouseX = 0; }
  if (mouseY < 0) { mouseY = 0; }

  return true;
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

/***
 *    ##      ##  #######  ########  ########       ########  ######## ##          ###    ######## ######## ########
 *    ##  ##  ## ##     ## ##     ## ##     ##      ##     ## ##       ##         ## ##      ##    ##       ##     ##
 *    ##  ##  ## ##     ## ##     ## ##     ##      ##     ## ##       ##        ##   ##     ##    ##       ##     ##
 *    ##  ##  ## ##     ## ########  ##     ##      ########  ######   ##       ##     ##    ##    ######   ##     ##
 *    ##  ##  ## ##     ## ##   ##   ##     ##      ##   ##   ##       ##       #########    ##    ##       ##     ##
 *    ##  ##  ## ##     ## ##    ##  ##     ##      ##    ##  ##       ##       ##     ##    ##    ##       ##     ##
 *     ###  ###   #######  ##     ## ########       ##     ## ######## ######## ##     ##    ##    ######## ########
 */
 function scoreWord(word) { return Math.pow(word.length, 2); }

 function checkWord(word) {
	 if (levelList[word] == false)
	 {
	 	 levelList[word] = true;
		 updateLevelList();
		 isLevelDone();
	 }
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
         document.getElementById("horn").play();

         return false;
       } else {
         //alert("good");
         latestWord = word;
         latestDef = defs[0].text;

         score += scoreWord(word);
         document.getElementById("chimes").play();

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

/***
 *    ########   #######  ##     ##      ##     ##    ###    ##    ## #### ########
 *    ##     ## ##     ## ###   ###      ###   ###   ## ##   ###   ##  ##  ##     ##
 *    ##     ## ##     ## #### ####      #### ####  ##   ##  ####  ##  ##  ##     ##
 *    ##     ## ##     ## ## ### ##      ## ### ## ##     ## ## ## ##  ##  ########
 *    ##     ## ##     ## ##     ##      ##     ## ######### ##  ####  ##  ##
 *    ##     ## ##     ## ##     ##      ##     ## ##     ## ##   ###  ##  ##
 *    ########   #######  ##     ##      ##     ## ##     ## ##    ## #### ##
 */
function updateLevelList() {
	var ll = document.getElementById("levelList");
	ll.innerHTML = "";
	for (var word in Object.keys(levelList)) {
		var lli = document.createElement("li");
		var listWord = Object.keys(levelList)[word];
		lli.innerHTML = listWord;
		if (levelList[listWord]) {
			lli.classList.add("completed");
		}
		ll.appendChild(lli);
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

function toggleSidebar() {
    var side = document.getElementById("sidebar")
    var disp = side.style.display;
    side.style.display = (disp == "block") ? "none" : "block";
}

function isLevelDone() {
	var flag = false;
	for (var w in levelList) {
		flag = flag && levelList[w];
		console.log(w + ": " + levelList[w]);
	}
	if(flag)
		level = levelObject.levelNumber + 1
		window.localStorage.setItem("level", level);
		loadLevel(level);
	return flag;
}

function loadLevel(level) {
  var fileName = "./levels/" + level + ".json";
  var contents;
	var levelObject;
  var file = new XMLHttpRequest();
  file.open("GET", fileName, false);
  file.onreadystatechange = function () {
    if(file.readyState === 4) {
      if(file.status === 200 || file.status == 0) {
        var contents = file.responseText;
        levelObject = JSON.parse(contents);
      }
    }
  }
  file.send(null);
	return levelObject;
}

function fadeIn(element) {
	element.classList.addChild("hidden");
	element.classList.removeChild("visible");
}

function fadeOut(element) {
	element.classList.addChild("visible");
	element.classList.removeChild("hidden");
}

//Transisitons
//Animations
//Transforms
