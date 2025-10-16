/*
    Prime Factorization - Have the user enter a number and find
    all Prime Factors (if there are any) and display them.
*/

var getPrimeFactors = function () {
  "use strict";

  var n = parseInt(document.getElementById("num").value);
  var outputSpan = document.getElementById("pf");
  var sequence = [];

  function isPrime(num) {
    if (num <= 1) return false;
    for (var i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }

  while (n % 2 === 0) {
    sequence.push(2);
    n = n / 2;
  }

  for (var i = 3; i <= Math.sqrt(n); i = i + 2) {
    while (n % i === 0) {
      sequence.push(i);
      n = n / i;
    }
  }

  if (n > 2) {
    sequence.push(n);
  }

  outputSpan.textContent = "The prime factors are: [" + sequence.join(", ") + "]";
  return sequence;
};