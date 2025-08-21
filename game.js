const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('ProgressText');
const progressBarFill = document.getElementById('progressBarFill');
console.log(choices);
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions=[
    {
        question: 'Thủ đô của Việt Nam là gì?',
        choice1: 'Hà Nội',
        choice2: 'TP. Hồ Chí Minh',
        choice3: 'Đà Nẵng',
        choice4: 'Huế',
        answer: 1
    },
    {
        question: 'Ai là người phát minh ra bóng đèn?',
        choice1: 'Isaac Newton',
        choice2: 'Thomas Edison',
        choice3: 'Albert Einstein',
        choice4: 'Nikola Tesla',
        answer: 2
    },
    {
        question: 'Số nào là số nguyên tố?',
        choice1: '4',
        choice2: '6',
        choice3: '7',
        choice4: '8',
        answer: 3
    },
    {
        question: 'Biển lớn nhất thế giới là?',
        choice1: 'Biển Đỏ',
        choice2: 'Biển Địa Trung Hải',
        choice3: 'Thái Bình Dương',
        choice4: 'Biển Đông',
        answer: 3
    }
]
fetch("https://opentdb.com/api.php?amount=10")
    .then(res => {return res.json()})
    .then(loadedQuestions => {
        console.log(loadedQuestions);
        if (loadedQuestions.response_code === 0) {
            questions= loadedQuestions.results.map(loadedQuestion => {
                const formattedQuestion = {
                    question: loadedQuestion.question
                };
                const answerChoices = [...loadedQuestion.incorrect_answers];
                formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
                answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);
                answerChoices.forEach((answer, index) => {
                    formattedQuestion['choice' + (index + 1)] = answer;
                });
                return formattedQuestion;
            }
            )
            console.log("API is working correctly");
        } else {
            console.error("API is not working correctly");
        }
        startGame();
    });
const MAX_QUESTIONS = 10;
startGame = () => {
    
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}
getNewQuestion = () => {
    const questionCountText =questions.length;
    if (availableQuestions.length === 0 || questionCounter >= questionCountText) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('/end.html');
    }
    questionCounter++;
    progressText.innerText = "Question: "+questionCounter+'/'+ questionCountText;
    updateProgressBar() 
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        if (classToApply === 'correct') {
            incrementScore(100);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 500);
    });
});
function incrementScore(num) {
    score += num;
    const scoreText = document.getElementById('hudscore-value');
    if (scoreText) scoreText.innerText = score;
    

}
function updateQuestionCount() {
    if (questionCountText) questionCountText.innerText = questionCounter+'/'+ MAX_QUESTIONS;
}
function updateProgressBar() {
    const questionCountText =questions.length;
    const progressPercentage = (questionCounter / questionCountText) * 100;
    progressBarFill.style.width = progressPercentage + '%';
}
