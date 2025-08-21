const finalscore = document.getElementById('score-value');
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('save');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highscore = JSON.parse(localStorage.getItem('highscore')) || [];

finalscore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value.trim(); 
});

const saveHighScore = e => {
    e.preventDefault();

    if (!username.value.trim()) {
        alert("Vui lòng nhập username trước khi lưu!");
        return; // không lưu nếu rỗng
    }

    const score = {
        score: mostRecentScore,
        name: username.value.trim()
    };

    highscore.push(score);
    highscore.sort((a, b) => b.score - a.score);
    highscore.splice(5);

    localStorage.setItem('highscore', JSON.stringify(highscore));
    window.location.assign('/index.html');
};

saveScoreBtn.addEventListener('click', saveHighScore);
