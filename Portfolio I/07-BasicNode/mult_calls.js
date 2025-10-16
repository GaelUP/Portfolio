const superheroes = require('superheroes');
const supervillains = require('supervillains');

const allSuperheroes = superheroes.default;
const allSupervillains = supervillains.default;

function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const hero = getRandomItem(allSuperheroes);
const villain = getRandomItem(allSupervillains);

console.log(`${hero} is fighting ${villain} in an epic battle!`);

console.log('--- end of script ---');