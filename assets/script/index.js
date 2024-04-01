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

let gameRunning = false;
let setTime;

const gameMusic = new Audio('./assets/media/music.mp3')
gameMusic.type = "audio/mp3"

/*
  functions
*/

function setDate () {
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  };

  let currentDate = new Date().toLocaleDateString('en-CA', options);
  date.innerHTML = currentDate;
}

function startGame () {
  gameRunning = true;
  start.classList.add('hidden');
  reset.classList.remove('hidden');
  gameMusic.play()
  startTimer();
}

function startTimer() {
  let startTime = 99;
  let timeLeft = startTime;
  setTime = setInterval(function() {
    timer.innerHTML = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(setTime);
      gameRunning = false;
      stopMusic()
    }
    timeLeft--;
  }, 1000);
}

function checkWord() {
  let input = userInput.value.trim();
  let currentWord = word.innerHTML;
  if (gameRunning && currentWord === input) {
    newWord();
  }
}

function newWord() {
  console.log(5)
}

function resetGame() {
  gameRunning = false;
  start.classList.remove('hidden');
  reset.classList.add('hidden');
  clearInterval(setTime); 
  timer.innerHTML = 99;

  stopMusic()
}

function stopMusic () {
  gameMusic.pause()
  gameMusic.currentTime = 0
}

/*
  eventlisteners
*/

utils.listen('load', window, setDate);
utils.listen('click', start, startGame);
utils.listen('click', reset, resetGame);
utils.listen('input', userInput, checkWord);

