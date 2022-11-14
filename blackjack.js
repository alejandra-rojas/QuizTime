'use strict';

let player = {
  name: 'Ale',
  chips: 200
}
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false; // so the game starts until we click start game
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.querySelector("#sum-el");
let cardsEl = document.querySelector("#cards-el");

// let playerEl = document.getElementById("player-el");
// playerEl.textContent = player.name + ": £" + player.chips;

function getRandomCard() {
    let randomNumer = Math.floor( Math.random()*13 ) + 1
    if (randomNumer > 10) {
        return 10
    } else if (randomNumer === 1) {
        return 11
    } else {
        return randomNumer
    }
}

function startGame() {
  isAlive = true;
  // Generate two random numbes so that the game can start
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  renderGame();
}

function renderGame() {
  cardsEl.textContent = "Cards: ";      
  // Create a for loop that renders out all the cards instead of just two
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " "
}

  sumEl.textContent = "Sum: " + sum
  if (sum < 21) {
    message = "Do you want a new card? ";
  } else if (sum === 21) {
    message = "You got blackjack!";
    hasBlackJack = true;
  } else {
    message = ("You lost!");
    isAlive = false;
  }; 
  messageEl.textContent = message;
}

  function newCard() {
    if (isAlive === true && hasBlackJack === false) {
      let thirdCard = getRandomCard();
      // Push the card to the cards array
      cards.push(thirdCard)
      sum += thirdCard;
      renderGame();
  }

} 


