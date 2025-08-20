import * as game from './game.js';
const finalscore= document.getElementById('score-value');
finalscore.innerText = localStorage.getItem('finalScore');