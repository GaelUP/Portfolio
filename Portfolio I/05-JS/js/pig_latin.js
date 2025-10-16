/*
Pig Latin
*/

function igpayAtinlay() {
  // Get the input string from the text field
  var str = document.getElementById("txtVal").value;
  var outputSpan = document.getElementById("pigLatLbl");

  // TODO: Initialize the word array properly - Split the input string into words
  var returnArray = [];
  var wordArray = str.split(" "); // Split by space to handle multiple words

  // TODO: make sure that the output is being properly built to produce the desired result.
  for (var i = 0; i < wordArray.length; i++) {
    var word = wordArray[i];
    if (word.length === 0) {
      continue;
    }

    var firstChar = word.charAt(0);

    if (/[aeiouAEIOU]/.test(firstChar)) {
      returnArray.push(word + "way");
    } else {
      var firstVowelIndex = -1;
      for (var ii = 0; ii < word.length; ii++) {
        if (/[aeiouAEIOU]/.test(word.charAt(ii))) {
          firstVowelIndex = ii;
          break;
        }
      }

      if (firstVowelIndex === -1) {
        returnArray.push(word + "ay");
      } else {
        var consonantCluster = word.substring(0, firstVowelIndex);
        var restOfWord = word.substring(firstVowelIndex);
        returnArray.push(restOfWord + consonantCluster + "ay");
      }
    }
  }

  var result = returnArray.join(" ");
  outputSpan.textContent = "Pig Latin: " + result;
  return result;
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("btn").addEventListener("click", igpayAtinlay);
});


console.log("pizza -> " + igpayAtinlayTest("pizza"));
console.log("apple -> " + igpayAtinlayTest("apple"));
console.log("happy meal -> " + igpayAtinlayTest("happy meal"));
console.log("rhythm -> " + igpayAtinlayTest("rhythm"));
console.log("hello world -> " + igpayAtinlayTest("hello world"));

function igpayAtinlayTest(str) {
  var returnArray = [];
  var wordArray = str.split(" ");

  for (var i = 0; i < wordArray.length; i++) {
    var word = wordArray[i];
    if (word.length === 0) {
      continue;
    }

    var firstChar = word.charAt(0);

    if (/[aeiouAEIOU]/.test(firstChar)) {
      returnArray.push(word + "way");
    } else {
      var firstVowelIndex = -1;
      for (var ii = 0; ii < word.length; ii++) {
        if (/[aeiouAEIOU]/.test(word.charAt(ii))) {
          firstVowelIndex = ii;
          break;
        }
      }

      if (firstVowelIndex === -1) {
        returnArray.push(word + "ay");
      } else {
        var consonantCluster = word.substring(0, firstVowelIndex);
        var restOfWord = word.substring(firstVowelIndex);
        returnArray.push(restOfWord + consonantCluster + "ay");
      }
    }
  }
  return returnArray.join(" ");
}