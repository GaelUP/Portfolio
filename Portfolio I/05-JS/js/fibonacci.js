/*
    Fibonacci Sequence - Enter a number and have the program
    generate the Fibonacci sequence to that number or to the Nth number.
*/
// This array will keep memory of the previous fibonacci numbers
var memo = {};

function fibonacci() {
  "use strict";
  var n = parseInt(document.getElementById("num").value); // Parse input to integer
  var val = f(n);
  document.getElementById("fibonacciLbl").textContent = "The Fibonacci value at position " + n + " is: " + val;
  return val;
}

function f(n) {
  var value;
  // Check if the memory array already contains the requested number
  if (memo.hasOwnProperty(n)) {
    value = memo[n];
  } else {
    // Implement the fibonacci function here!
    if (n <= 0) {
      value = 0;
    } else if (n === 1) {
      value = 1;
    } else {
      value = f(n - 1) + f(n - 2);
    }
    memo[n] = value;
  }

  return value;
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("btn").addEventListener("click", fibonacci);
});

// The console.log(fibonacci(15)) from the original is likely for testing,
// if you want to run it directly uncomment and ensure 'memo' is accessible or passed.
// console.log(f(15)); // Use f(15) directly for console testing of the function.