'use strict';

const apiUrl = 'https://opentdb.com/api.php?amount=40&type=multiple';
let currentScore = 0;
const scoreDisplay = document.getElementById('score-el');
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const highScores = JSON.parse(localStorage.getItem("highscores")) || [];
const highScoresBtn = document.getElementById('scoreboard');
const timer = document.querySelector('h5');
let quizDurationSeconds = 10; // Change this to change the time. 
const startQuizBtn = document.getElementById('startQuiz');


startQuizBtn.addEventListener('click', function(){
  const startScreen = document.getElementById('startScreen');
  const quizScreen = document.getElementById('quizScreen');
  const titleEl = document.getElementById('title');
  startScreen.style.display = 'none';
  quizScreen.style.display= 'block';
  titleEl.remove();


  const countDown = setInterval (() => {
    quizDurationSeconds--;
    displayTime(quizDurationSeconds);
    if (quizDurationSeconds <= 0 || quizDurationSeconds < 1){
      timeOverModal()
      clearInterval(countDown)
    }
  }, 1000) 
  
})



 function displayTime(duration){
  const min = Math.floor(duration / 60);
  const sec = Math.floor(duration % 60);
  timer.innerHTML = `${min<10 ? '0': ''}${min}:${sec<10?'0':''}${sec}`
}

// API QUIZ

async function getQuiz() {
  let response = await fetch(apiUrl);
  let data = await response.json();
  return data;
}

getQuiz().then((data) => {
  const allquestions = data.results;
  console.log(allquestions);
  let indexNumber = 0;
  let results = data.results[`${indexNumber}`];
  renderQuestion();
  console.log(results.correct_answer);
  

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

        if (el.value === results.correct_answer) { 
          currentScore += 1;
          result.innerHTML = "🥳";
          result.className = 'emoji';
            el.checked = false;
          setTimeout(() => {
            result.className = 'none';
            newQuestion();
          }, 500)
          
          renderScore();
          
        } else
          result.innerHTML = `😭 `;
          result.className = 'emoji';
          el.checked = false;
          setTimeout(() => {
            result.className = 'none';
            newQuestion();
          }, 500)
      }
    });
  });
  }


  document.getElementById('new').addEventListener('click', () => {
    newQuestion();
  });

  function newQuestion(){
    indexNumber += 1;
    results = data.results[`${indexNumber}`];
    console.log(results.correct_answer);
    renderQuestion();
    console.log(indexNumber);
  } ;
});

// END OF QUIZ

username.addEventListener('keyup', () => {
  console.log(username.value);
  saveScoreBtn.disabled = !username.value;
});

let submitScore = document.getElementById('saveScoreForm');

submitScore.onsubmit = function(event) {
  event.preventDefault();

  const saveScore = {
    score: currentScore,
    user: username.value
  } 
  highScores.push(saveScore);
  highScores.sort ( (a,b) => b.score - a.score);  // Sort from high score to low score
  highScores.splice(15); // Maximum of scores saved in the array

  localStorage.setItem('highscores', JSON.stringify(highScores))
  showHighScores();
}


function showHighScores() {
  const innerContainer = document.getElementById('inner-container');
  innerContainer.innerHTML = "";
  const highScoresList = document.getElementById('highScoresList');
  const highScores = JSON.parse(localStorage.getItem("highscores")) || [];
  

  highScoresList.innerHTML = 
  highScores.map (score => {
      return `<li class="highScoresList">${score.user} - ${score.score}</li>`
  }).join("")
}




function shuffleArray(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const s = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[s]] = [arr[s], arr[i]];
  }
}

function renderScore(){
  scoreDisplay.innerHTML = currentScore;
}

function timeOverModal(){
  timer.innerHTML = 'time out';
  const modal = document.getElementById('modal');
  modal.style.display = 'block';  
  const finalScore = document.getElementById('score-final');
  finalScore.innerHTML = `Your score: ${currentScore}`;
  const message = document.getElementById('message');
  if (currentScore > 7){
    message.innerHTML = "You are a star!"
  } else if (currentScore >= 3){
    message.innerHTML = "Well done! You scored above average"
  } else if (currentScore >= 1) {
    message.innerHTML = "Better than nothing!"
  } else {
    modal.style.backgroundColor = 'red';
    finalScore.innerHTML = '';
    const saveScore = document.getElementById('save-score');
    saveScore.style.display = 'none'
    message.innerHTML = `Oh, that was awful,<br> maybe give it another go?`
  }
  reStartQuiz();
}

highScoresBtn.addEventListener('click', function(){
  const modal = document.getElementById('modal');
  modal.style.display = 'block';  
  showHighScores()
  reStartQuiz();
});

function reStartQuiz(){
  const reStartBtn = document.getElementById('reStart-btn');
  reStartBtn.addEventListener('click', function(){
    location.reload();
  })
}
