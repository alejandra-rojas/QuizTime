'use strict';



/// Age checker

/* let age = 19;

if (age < 21) {
  console.log("You are too young for this")
} else {
  console.log("Welcome!")
}; */


/// 

/* let age = 90;

if (age < 100) {
  console.log("not elegible")
} else if (age ==== 100) {
  console.log("here is your birthday card")
} else {
  console.log ("not elegible anymore")
}; */


/// Count to ten!
///      START      FINISH      STEP SIZE
/* for (let count = 1; count < 21; count += 1) {
    console.log(count)
} */


/// Loop - Convention to use i when counting
/* for (let i = 10; i <= 100; i += 10) {
    console.log(i)
} */

/// FOR LOOP
/* let messages = [
    "Hey, how's it going?",        
    "I'm great, thank you! How about you?",
    "All good. Been working on my portfolio lately.",
    "Same here!",
    "Great to hear"
]

// DRY - Don't repeat yourself
// console.log(messages[0])
// console.log(messages[1])
// console.log(messages[2])
// console.log(messages[3])

for (let i = 0; i < messages.length; i += 1) {  // instead of i += 1, we can use i++ to increment by 1
    console.log(messages[i]) 
} */

/// excercise

/* let sentence = ["Hello", "my", "name", "is", "Per"] 
let greetingEl = document.getElementById("greeting-el")

// How do you keep the spaces between the words if I remve them from the array?

for (let i = 0; i < sentence.length; i++) {
    greetingEl.textContent += sentence[i] + " "
} */



// RETURNING VALUE IN FUNCTIONS

/* let player1Time = 102
let player2Time = 107

// cmd+d - to select same 
function getFastestRaceTime() {
    if (player1Time < player2Time) {
        return player1Time
    } else if (player2Time < player1Time) {
        return player2Time
    } else {
        return player1Time
    }
}

let fastestRace = getFastestRaceTime()
console.log(fastestRace) */

// Write a function that returns the total race time
// Call/invoke the function and store the returned value in a new variable
// Finally, log the variable out

/* function getTotalRaceTime() {
  return player1Time + player2Time
}

let totalTime = getTotalRaceTime()

console.log(totalTime) */





// Create a function, rollDice(), that returns a random number between 1 and 6


function rollDice() {
  let randomNumber = Math.floor( Math.random() * 6 ) + 1
  return randomNumber
}
console.log(rollDice())



// LOGICAL OPERATORS

let hasCompletedCourse = true
let givesCertificate = false

if (hasCompletedCourse === true || givesCertificate === true) {
        generateCertificate()
}

function generateCertificate() {
    console.log("Generating certificate....")
}

// another excercise

/* let hasSolvedChallenge = false
let hasHintsLeft = false

// Create an if statement that checks that both variables are false.
// If so, run the showSolution() function

if (hasSolvedChallenge === false && hasHintsLeft === false) {
  showSolution()
}

function showSolution() {
    console.log("Showing the solution....")
} */


// Create two boolean variables, likesDocumentaries and likesStartups
// Use an OR statement (||) to call recommendMovie() if either of those variables are true

let likesDocumentaries = true
let likesStartups = false

if (likesDocumentaries === true || likesStartups === true) {
    recommendMovie()
}

function recommendMovie() {
    console.log("Hey, check out this new film we think you will like!")
}


// Create an object that represents an airbnb castle listing.
// It should contain at least one boolean, one string, one number, and one array
// Log out at least two of the keys using the dot notation

let castle = {
  title: "Live like a king",
  price: 190,
  issuperhost: true,
  images: ["img/castle1.png", "img/castle2.png", "img/castle3.png"]
}

console.log (castle.price);
console.log (castle.issuperhost);