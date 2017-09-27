var _rows = 8;
var _cols = _rows;
var _count = _rows * _cols;
//var _count = 13;

function onload() {
  console.log("Initializing...");
  alert("Welcome\nYou're experience is being generated...");

  //Create a div for Loops, Conditional Statements, Functions,
  //Variables, Parameters, Arrays, Associative Arrays
  var div1 = document.createElement("DIV");

  //Create a table to store values for each lesson...
  var value = 1;
  var table = document.createElement("TABLE");
  for (var m = 0; m < _rows; m++) {
    var row = document.createElement("TR");   //create a row
    for (var n = 0; n < _cols; n++) {         //loop through _count times
      var data = document.createElement("TD");//create table data

      //impose a checkerboard pattern
      if ((n % 2 && m % 2) || (!(n % 2) && !(m % 2))) {
        data.classList.add("red");
      } else {
        data.classList.add("black");
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
  for (var i = 0; i < primes.length; i++) {
    if (n == primes[i]) return true;
    if (!(n % primes[i])) return false;
  }
  return true;
}

function myFunction() {
  console.log("test");
  alert("This is a test.");
  document.getElementById('para1').innerHTML = "CHANGED";
}
