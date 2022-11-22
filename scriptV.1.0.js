'use strict';


// This script refreshes the page after every question, therefore is feasible to store the score in localStorage, 
// however timer gets restarted every time page reloads, so not the required solution. 

// let user = {
//   username: prompt("What's your name?"),
//   score: null;
// } 

// let user = prompt("What's your name?");

let currentScore = parseInt(sessionStorage.getItem('score') ?? '0');
const scoreDisplay = document.getElementById('score-el');
const timer = document.querySelector('h5');
let quizDuration = 90;

displayTime(quizDuration);


const countDown = setInterval (() => {
  quizDuration--;
  displayTime(quizDuration);
  if (quizDuration <= 0 || quizDuration < 1){
    endMessage()
    clearInterval(countDown)
  }
}, 1000)

function displayTime(duration){
  const min = Math.floor(duration / 60);
  const sec = Math.floor(duration % 60);
  timer.innerHTML = `${min<10 ? '0': ''}${min}:${sec<10?'0':''}${sec}`
}

function endMessage(){
  timer.innerHTML = 'time out';
}


renderScore();
function renderScore(){
  scoreDisplay.innerHTML = currentScore;
}



const url = 'https://opentdb.com/api.php?amount=20&type=multiple';

async function getTrivia() {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const s = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[s]] = [arr[s], arr[i]];
  }
}

getTrivia().then((data) => {
  const allquestions = data.results;
  console.log(allquestions);
  const results = data.results[0];
  console.log(results);

  renderQuestion();
  

  function renderQuestion() { 
  
  document.getElementById('question').innerHTML = results.question;
  document.getElementById('category').innerHTML = results.category;
  const difficulty =
    results.difficulty[0].toUpperCase() + results.difficulty.substring(1);
  document.getElementById('difficulty').innerHTML = difficulty;
  const answers = [...results.incorrect_answers, results.correct_answer];
  shuffleArray(answers);
  for (let i = 0; i < 4; i++) {
    let index = i + 1;
    document.getElementById(`choice${index}label`).innerHTML = answers[i];
    document.getElementById(`choice${index}`).value = answers[i];
  }

  document.getElementById('guess').addEventListener('click', () => {
    document.querySelectorAll('input[name="choice"]').forEach((el) => {
      const result = document.getElementById('result');
      if (el.checked) {
        console.log(el.value);
        console.log(results.correct_answer);

        if (el.value === results.correct_answer) {
          sessionStorage.setItem('score', (currentScore + 1).toString())
          result.innerHTML = "🥳";
          result.className = 'emoji';

          setTimeout(() => {
            location.reload();
          }, 500)
        
          
        } else
          result.innerHTML = `😭 `;
          result.className = 'emoji';
          setTimeout(() => {
            location.reload();
          }, 500)
      }
    });
  });
  }


  document.getElementById('new').addEventListener('click', () => {
    renderQuestion();
    // location.reload();
  });


});





