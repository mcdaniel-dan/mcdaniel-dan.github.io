

var ROWS = 8;
var COLS = ROWS;
var COUNT = ROWS * COLS;
//var COUNT = 13;
//
//window.addEventListener('load', onload(), false);

function onload() {
  console.log("Initializing...");
  //alert("Welcome\nYou're experience is being generated...");

  var colors = {one:"gray", two:"black"};//associative array/object

  //Create a div for Loops, Conditional Statements, Functions,
  //Variables, Parameters, Arrays, Associative Arrays
  var div1 = document.createElement("DIV");

  //Create a table to store values for each lesson...
  var value = 1;
  //var table = document.createElement("TABLE");
  var table = document.createElement("DIV");
  for (var m = 0; m < ROWS; m++) {
    //var row = document.createElement("TR");   //create a row
    var row = document.createElement("DIV");   //create a row

    for (var n = 0; n < COLS; n++) {         //loop through COUNT times
      //var data = document.createElement("TD");//create table data
      var data = document.createElement("DIV");//create table data

      //Squares
      data.style.width  = 100 * (1/COLS) + "vw";
      data.style.height = data.style.width;

      //Middle Vertical Alignment
      data.style.lineHeight = data.style.width;

      //Scale font to a reasonable size
      data.style.fontSize = data.style.width / 2;

      //Checker Class -- Center Horizontal
      data.classList.add("checker");

      //Add event handlers for touch events
      //data.onclick = function() { sendAlert() };
      data.touchcancel = function() { console.log("touchcancel") };
      data.touchstart = function() { console.log("touchstart") };
      data.touchmove = function() { console.log("touchmove") };
      data.touchend = function() { console.log("touchend") };
      //data.addEventListener("touchmove", touchmove(e), false);
      //data.addEventListener("touchend", touchend(e), false);

      //impose a checkerboard pattern
      if ((n % 2 && m % 2) || (!(n % 2) && !(m % 2))) {
        data.classList.add(colors["one"]);
      } else {
        data.classList.add(colors["two"]);
      }
      if (isPrime(value)) data.classList.add("bold");
      data.innerHTML = value++; //set value of the td
      row.appendChild(data);    //append the td to the row
    }
    table.appendChild(row);
  }
  div1.appendChild(table);
  document.body.appendChild(div1);

  // var para = document.createElement("P");
  // para.innerHTML = "BINGO!";
  // document.body.appendChild(para);
}

//determine if the number is prime for finite set
function isPrime(n) {
  if (n == 1) return false;
  var primes = [ 2, 3, 5, 7 ];

  //check to see if n is a known prime
  var i = 0;
  do {
    if (n == primes[i++]) return true;
  } while (i < primes.length);

  //check to see if n is a mulitple of a known prime
  var j = 0;
  while(j < primes.length) {
    if (!(n % primes[j])) return false;
    j++;
  }
  return true;
}

// function touchstart(e) {
//   var obj = e.changedTouhes[0];
//   var startx = parseInt(obj.clientX);
//   console.log("Start: " + startx + "px");
// }

// function touchmove(e) {}
// function touchend(e) {}
function sendAlert() { alert("This is a test."); }

function myFunction() {
  console.log("test");
  alert("This is a test.");
  document.getElementById('para1').innerHTML = "CHANGED";
}
