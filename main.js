var _rows = 8;
var _cols = _rows;
var _count = _rows * _cols;
//var _count = 13;

function onload() {
  console.log("Initializing...");
  //alert("Welcome\nYou're experience is being generated...");

  var colors = {one:"red", two:"black"};//associative array/object

  //Create a div for Loops, Conditional Statements, Functions,
  //Variables, Parameters, Arrays, Associative Arrays
  var div1 = document.createElement("DIV");

  //Create a table to store values for each lesson...
  var value = 1;
  //var table = document.createElement("TABLE");
  var table = document.createElement("DIV");
  for (var m = 0; m < _rows; m++) {
    //var row = document.createElement("TR");   //create a row
    var row = document.createElement("DIV");   //create a row
    //row.style.height = 100 * (1/_rows) + "%";
    //row.style.height = "20vw";
    // row.style.display = "table";
    // row.style.clear = "both";
    // row.style.content = "";

    for (var n = 0; n < _cols; n++) {         //loop through _count times
      //var data = document.createElement("TD");//create table data
      var data = document.createElement("DIV");//create table data

      //Squares
      data.style.width  = 100 * (1/_cols) + "vw";
      data.style.height = data.style.width;

      //Middle Vertical Alignment
      data.style.lineHeight = data.style.width;

      //Checker Class -- Center Horizontal
      data.classList.add("checker");

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

function myFunction() {
  console.log("test");
  alert("This is a test.");
  document.getElementById('para1').innerHTML = "CHANGED";
}
