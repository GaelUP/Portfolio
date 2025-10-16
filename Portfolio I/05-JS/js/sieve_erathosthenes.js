/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

// TODO: Adjust this script so it can work with the sieve.html file.

var sieve = function () {
  "use strict";

  var n = parseInt(document.getElementById("num").value);
  var outputSpan = document.getElementById("primes");

  if (isNaN(n) || n < 2) {
    outputSpan.textContent = "Please enter a number greater than 1.";
    return [];
  }

  var array = [],
    primes = [],
    i,
    j;

  for (i = 0; i <= n; i++) {
    array[i] = true;
  }

  array[0] = false;
  array[1] = false;

  for (i = 2; i * i <= n; i++) {
    if (array[i]) {
      for (j = i * i; j <= n; j += i) {
        array[j] = false;
      }
    }
  }

  for (i = 2; i <= n; i++) {
    if (array[i]) {
      primes.push(i);
    }
  }

  outputSpan.textContent = primes.join(", ");

  return primes;
};

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("btn").addEventListener("click", sieve);
});