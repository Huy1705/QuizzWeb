const list= document.getElementById("highscores-list");
const highscores= JSON.parse(localStorage.getItem("highscore")) || [];
list.innerHTML = highscores.map(score => {
    return `<li class="highscore">${score.name} - ${score.score}</li>`;
}).join("");