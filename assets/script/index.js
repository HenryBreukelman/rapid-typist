'use strict';

import * as utils from './utils.js';

let words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 
'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money', 
'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow', 
'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 
'philosophy', 'database', 'periodic', 'capitalism', 'abominable', 'component', 
'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 
'agency', 'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 
'magician', 'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 
'evolution', 'banana', 'perfumer', 'computer', 'management', 'discovery', 
'ambition', 'music', 'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 
'enemy', 'button', 'superman', 'library', 'unboxing', 'bookstore', 'language', 
'homework', 'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 
'mystery', 'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 
'yellow', 'keyboard', 'window'];

/*
  selectors
*/

const date = utils.select('.date');
const start = utils.select('.start-button');
const reset = utils.select('.reset-button');
const timer = utils.select('.timer');
const word = utils.select('.word');
const score = utils.select('.score');
const userInput = utils.select('.user-input');
const highScores = utils.select('.score-button')
const highScoresBox = utils.select('.high-score-box');
const close = utils.select('.close');
const game = utils.select('.game');
const scores = utils.select('.scores');

let gameRunning = false;
let setTime;
let newList;
let gameScore = 0;
let scoresList = [];
let gameTime = 10 // change back to 99

const gameMusic = new Audio('./assets/media/music.mp3');
gameMusic.type = "audio/mp3";
gameMusic.volume = 0.7;

const correct = new Audio('./assets/media/correct.mp3');
correct.type = "audio/mp3";

/*
  functions
*/

function getDate() {
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  };

  let currentDate = new Date().toLocaleDateString('en-CA', options);
  return currentDate
}

function setDate() {
  let currentDate = getDate()
  date.innerText = currentDate;
}

//game

function startGame () {
  gameRunning = true;
  start.classList.add('hidden');
  reset.classList.remove('hidden');
  userInput.disabled = false;
  userInput.focus();
  gameMusic.play()
  score.innerText = 0;
  shufflelist();
  startTimer();
  newWord();
  closeScores();
}

function startTimer() {
  let startTime = gameTime;
  let timeLeft = startTime;
  setTime = setInterval(function() {
    timer.innerText = timeLeft;
    if (timeLeft <= 0) {
      resetGame();
    }
    timeLeft--;
  }, 1000);
}

function shufflelist() {
  newList = [...words].sort((a, b) => 0.5 - Math.random());
}

function checkWord() {
  let input = userInput.value.trim();
  let currentWord = word.innerText;
  if (gameRunning && currentWord.toLowerCase() === input.toLowerCase()) {
    userInput.value = '';
    gameScore++;
    score.innerText = gameScore;
    correct.play();
    newWord();
  }
}

function newWord() {
  word.innerText = newList.shift();
}

function restartGame() {
  resetGame();
  startGame();
}

function resetGame() {
  gameRunning = false;
  start.classList.remove('hidden');
  reset.classList.add('hidden');
  clearInterval(setTime); 
  timer.innerText = gameTime;
  userInput.disabled = true;
  userInput.value = '';
  word.innerText = ''
  setHighScores();
  gameScore = 0;
  stopMusic();
}

function stopMusic () {
  gameMusic.pause();
  gameMusic.currentTime = 0;
}

//scores

function openScores() {
  highScoresBox.classList.remove('hidden');
}

function closeScores() {
  highScoresBox.classList.add('hidden');
}

function setHighScores() {
  let newGameScore = getScore()
  let scoresList = JSON.parse(localStorage.getItem('highScores'))|| []
  scoresList.push(newGameScore);
  scoresList = scoresList.sort((a, b) => b.score - a.score).slice(0, 10);
  localStorage.setItem('highScores', JSON.stringify(scoresList));
  printScores(scoresList)
} 

function getScore() {
  let gamePercent = ((gameScore / words.length) * 100).toFixed(1);
  let scoreDate = getDate();
  const newScore = {
    score: gameScore,
    percent: gamePercent,
    date: scoreDate
  }
  return newScore
}

function printScores(scoreArray) {
  const highScoresList = JSON.parse(localStorage.getItem('highScores')) || [];
  let scoresHTML = '';

  highScoresList.forEach((score, index) => {
    scoresHTML += `
      <li class="flex spacebetween high-score">
        <p class="place">#${index + 1}</p>
        <p class="number">${score.score} words</p>
        <p class="percent">${score.percent}%</p>
        <p class="when">${score.date}</p>
      </li>
    `;
  });

  scores.innerHTML = scoresHTML;

  if (highScoresList.length === 0) {
    scores.innerHTML = `<p>No scores yet</p>`;
  }
}

/*
  eventlisteners
*/

utils.listen('load', window, setDate);
utils.listen('click', start, startGame);
utils.listen('click', reset, restartGame);
utils.listen('input', userInput, checkWord);
utils.listen('click', highScores, openScores);
utils.listen('click', close, closeScores);
utils.listen('click', game, closeScores);
utils.listen('load', window, printScores)
