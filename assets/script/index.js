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

const date = Utils.select('.date');
const start = Utils.select('.start-button');
const reset = Utils.select('.reset-button');
const timer = Utils.select('.timer');
const word = Utils.select('.word');
const score = Utils.select('.score');
const userInput = Utils.select('.user-input');

/*
  functions
*/



/*
  eventlisteners
*/

Utils.listen('click', user, userInfoOpen);