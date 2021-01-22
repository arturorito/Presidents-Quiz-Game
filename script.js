//selectors//
var welcome = document.querySelector("#welcome");
var link = document.querySelector("#highscoresLink");
var gameTitle = document.querySelector("#gameTitle");
var gameInstructions = document.querySelector("#desc");
var startButton = document.querySelector("#startQuiz");
var questions = [{ 
    question: "Who is the current US president?",
    choices: ["Barack Obama", "Hillary Clinton", "Joseph Biden", "Donald Trump"], 
    answer: 2},
{ 
    question: "Who was the third US president?",
    choices: ["Barack Obama", "George Washington", "Joseph Biden", "Thomas Jefferson"], 
    answer: 3},
{ 
    question: "Who was the first US president?",
    choices: ["George Washington", "Hillary Clinton", "Joseph Biden", "Donald Trump"], 
    answer: 0},   
{ 
    question: "Which of these presidents was assasinated in Dallas, TX?",
    choices: ["Barack Obama", "John F Kennedy", "Joseph Biden", "Donald Trump"], 
    answer: 1},   
{ 
    question: "Who is the oldest elected president?",
    choices: ["Barack Obama", "Hillary Clinton", "Joseph Biden", "Donald Trump"], 
    answer: 2},   
{ 
    question: "Abraham Lincoln was the ___ president.",
    choices: ["1st", "13th", "40th", "16th"], 
    answer: 3},   
{ 
    question: "Who was the WWII president?",
    choices: ["Barack Obama", "Hillary Clinton", "Joseph Biden", "Franklin D. Roosevelt"], 
    answer: 3},   
{ 
    question: "Which president has had known ties to white supremacists groups?",
    choices: ["Woodrow Wilson", "Lyndon B Johnson", "Theodore Roosevelt", "Goerge W. Bush"], 
    answer: 0},   
{ 
    question: "Which founding father was not a US president?",
    choices: ["Benjamin Franklin", "James Madison", "George Washington", "Thomas Jefferson"], 
    answer: 0},   
{ 
    question: "Who was the president in 2018?",
    choices: ["Barack Obama", "Hillary Clinton", "Joseph Biden", "Donald Trump"], 
    answer: 3}]

//intro page
link.textContent = "High Scores List";
gameTitle.textContent = "US Presidents Quiz";
gameInstructions.textContent = "Answer the following questions as quick as possible before the timer runs out. Every wrong answer takes away 10 seconds from your timer.";
startButton.textContent = "Click to Start Quiz";

var timer= document.querySelector("#timer");
var interval;
var totalTime = 60;
var askQuestion = document.querySelector(".ask");
var answerChoices = document.querySelector(".choices");
var activeQuiz = document.querySelector("#activeQuiz");
var answerResult = document.querySelector("#evaluate");
var currentQuestion = 0;
var quickResponse;


//click "Click to Start Quiz"
startButton.addEventListener("click", operateQuiz);
function operateQuiz() {
    hideHome();
    runtime();
    pullQuestion();
}  
//get rid of the instructions page
function hideHome() {
    welcome.style.display = "none"
    activeQuiz.style.display = "block"
}
//start the timer
function runtime() {
    interval = setInterval(countdown, 1000);
}
function countdown() {
    totalTime--;
    //stop the timer
    if(totalTime === 0){
        clearInterval(interval);
    }
    timer.textContent = "Timer: " + totalTime + " seconds";
}
//loop for the questions
function pullQuestion() {
    //for (i = currentQuestion; i < questions.length; i++) {
    askQuestion.textContent = questions[currentQuestion].question;
        for (j = 0; j < questions[currentQuestion].choices.length; j++) {
            options = document.querySelector("#choice"+j);
            options.textContent = questions[currentQuestion].choices[j];
        }
    }

//result after choosing an answer
answerChoices.addEventListener("click", pickAnswer);
function pickAnswer(event) {
    respond(event);
    resultAlert();
    setTimeout(nextQuestion, 1000);
}
function respond(event) {
    if(event.target.matches("button")) {
        event.preventDefault();
        userChoice = event.target.parentElement.id;
        console.log(userChoice);
        console.log(questions[currentQuestion].answer);       
    };
};
function resultAlert() {
    if (userChoice === "A" && questions[currentQuestion].answer === 0) {
        answerResult.textContent = "Correct!";
    } else if (userChoice === "B" && questions[currentQuestion].answer === 1) {
        answerResult.textContent = "Correct!";
    } else if (userChoice === "C" && questions[currentQuestion].answer === 2) {
        answerResult.textContent = "Correct!";
    } else if (userChoice === "D" && questions[currentQuestion].answer === 3) {
        answerResult.textContent = "Correct!";
    } else {answerResult.textContent = "Wrong."};
    quickResponse = setTimeout(removeAlert, 600);
};
function removeAlert() {
    answerResult.textContent = "";
};
function nextQuestion() {
    currentQuestion++;
    console.log(questions.length);
    if(currentQuestion > questions.length) {
        gameExit();
    }
    pullQuestion();
}
//at end of questions, we exit loop for questions
//game exit and results
function gameExit() {
    //game over
    //score
    //input name
        //when name is saved, save to local storage with the score
        //provide option to see scoreboards

//still missing the deduction of time when a question is wrong
//still missing the score for each right answer
}
