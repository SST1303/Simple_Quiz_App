const questions = [
    {
        text: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answerIndex: 3,
    },
    {
        text: "What does CSS stand for?",
        options: [
            "Central Style Sheets",
            "Cascading Style Sheets",
            "Cascading Simple Sheets",
            "Cars SUVs Sailboats",
        ],
        answerIndex: 1,
    },
    {
        text: "What does HTML stand for?",
        options: [
            "Hypertext Markup Language",
            "Hyperloop Machine Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language",
        ],
        answerIndex: 0,
    },
    {
        text: "What year was JavaScript launched?",
        options: ["1996","1995","1994","none of the above"],
        answerIndex: 1,
    },
];

//state
let currentIndex = 0;
let score = 0;
let selectedIndex = null;

//elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");

const quizCard = document.getElementById("quiz");
const resultCard = document.getElementById("result");
const scoreText = document.getElementById("scoreText");
const restartBtn = document.getElementById("restartBtn");

function setProgress(){
    const progress = ((currentIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function renderQuestion(){
    const q = questions[currentIndex];
    questionEl.textContent = q.text;
    optionsEl.innerHTML = "";
    selectedIndex = null;
    nextBtn.disabled = true;

    q.options.forEach((optionText, idx) => {
        const btn = document.createElement("button");
        btn.className = "option";
        btn.textContent = optionText;
        btn.addEventListener("click", () => selectOption(idx));
        optionsEl.appendChild(btn);
    });

    setProgress();
}

function selectOption(idx){
    if(selectedIndex !== null) return; // prevent change after selecting
    selectedIndex = idx;

    const q = questions[currentIndex];
    const childern = Array.from(optionsEl.children);
    childern.forEach((el, i) => {
        el.disabled = true;
        if(i === q.answerIndex){
            el.classList.add("option--correct");
        }
    });

    const selectedEl = childern[idx];
    selectedEl.classList.add("option--selected");
    if(idx !== q.answerIndex){
        selectedEl.classList.add("option--wrong");
    }else {
        score += 1;
    }

    nextBtn.disabled = false;
}

function showResult(){
    quizCard.classList.add("hidden");
    resultCard.classList.remove("hidden");

    scoreText.textContent = `${score} / ${questions.length}`;

    const pct = Math.round((score / questions.length) * 100);
    let message = "Nice effort!";
    if(pct === 100) message = "Perfect! You nailed it!";
    else if (pct >= 75) message = "Great job!";
    else if (pct >= 50) message = "Good try, keep practicing!";
    else message = "Keep going, you'll get there!";
    scoreMessage.textContent = message;

    progressBar.style.width = "100%";
}

function next(){
    if(currentIndex < questions.length - 1){
        currentIndex += 1;
        renderQuestion();
    } else {
        showResult();
    }
}

function restart(){
    currentIndex = 0;
    score = 0;
    selectedIndex = null;
    resultCard.classList.add("hidden");
    quizCard.classList.remove("hidden");
    progressBar.style.width = "0%";
    renderQuestion();
}

nextBtn.addEventListener("click", next);
restartBtn.addEventListener("click", restart);

renderQuestion(); //init