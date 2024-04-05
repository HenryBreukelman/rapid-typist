'use strict';

import * as utils from './utils.js';
import {Score} from './Score.js';

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
let scoresList;

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
  let startTime = 10;
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
  timer.innerText = '99';
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
  console.log(scoresList, 1)
  scoresList.push(newGameScore);
  console.log(scoresList, 2)
  scoresList.sort((a, b) => b.score - a.score).splice(0, 10);
  localStorage.setItem('highScores', JSON.stringify(scoresList));
  console.log(localStorage, 3)
} 

function getScore() {
  let gamePercent = ((gameScore / words.length) * 100).toFixed(1);
  let scoreDate = getDate();
  const newScore = {
    score: gameScore,
    perc: gamePercent,
    date: scoreDate
  }
  console.log(newScore, 4)
  return newScore
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

