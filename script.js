//selectors//
var welcome = document.querySelector("#welcome");
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
var endGame = document.querySelector("#gameEnd");
var header = document.querySelector("#startHeader");
var points = 0;


//click "Click to Start Quiz"
startButton.addEventListener("click", operateQuiz);
function operateQuiz() {
    hideHome();
    runtime();
    pullQuestion();
}  
//get rid of the instructions page
function hideHome() {
    header.style.display = "none"
    welcome.style.display = "none";
    activeQuiz.style.display = "block";
    endGame.style.display = "none";

}
//start the timer
function runtime() {
    interval = setInterval(countdown, 1000);
}
function countdown() {
    totalTime--;
    //stop the timer
    if(totalTime === 0 || totalTime < 0){
        clearInterval(interval);
        setTimeout(gameExit, 1000);    }
    timer.textContent = "Timer: " + totalTime + " seconds";
}
//loop for the questions
function pullQuestion() {
    console.log("current question:" + currentQuestion);
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
    console.log("currentQuestion: " + currentQuestion);
    console.log("total questions: " + questions.length);
    if (currentQuestion+1 === questions.length) {
        clearInterval(interval);
        setTimeout(gameExit, 1000);
    } else {setTimeout(nextQuestion, 1000)};            
}
function respond(event) {
    if(event.target.matches("button")) {
        event.preventDefault();
        userChoice = event.target.parentElement.id;
        console.log("user response: " + userChoice);
        console.log("actual answer: " + questions[currentQuestion].answer);       
    };
};
function resultAlert() {
    if ((userChoice === "A" && questions[currentQuestion].answer === 0) || 
    (userChoice === "B" && questions[currentQuestion].answer === 1) ||
    (userChoice === "C" && questions[currentQuestion].answer === 2) ||
    (userChoice === "D" && questions[currentQuestion].answer === 3)) {
        answerResult.textContent = "Correct!";
        points++;
        
    } else {answerResult.textContent = "Wrong.";
    totalTime = totalTime - 10;}
    console.log(points);
    quickResponse = setTimeout(removeAlert, 600);
};
function removeAlert() {
    answerResult.textContent = "";
};
function nextQuestion() {
    currentQuestion++;
    pullQuestion();
}
//at end of questions, we exit loop for questions
var score = document.querySelector("#score");
var userInput = document.querySelector("#inputName");
var playerName = document.querySelector("#playerName");
var seeScores = document.querySelector("#seeScores");
var seeScoresLink = document.querySelector("#seeScoresLink");
var endHeader = document.querySelector("#endHeader");
var initialScore = 0
var endAnnouncement = document.querySelector("#endAnnouncement");
var postScore = 0;
var bonusScore = 0;
var totalScroe = 0;
var buttonSubmit = document.querySelector("#submitName");
var records;
var playerInput = document.querySelector("#nameRequest");
//game exit and results
function gameExit() {
    endPage();
    userScore();
}

function endPage() {
    header.style.display = "block"
    activeQuiz.style.display = "none";
    endGame.style.display = "block";
    if (currentQuestion+1 === questions.length) {
        endAnnouncement.textContent = "All Questions Have Been Answered. Your Score is below.";
    } else {
        endAnnouncement.textContent = "You ran out of time! Game Over! Your Score is below."
    }    
}
function userScore() {
    initialScore = (points * 10);
    bonusScore = Math.floor(totalTime * (points/(questions.length)));
    totalScore = initialScore + bonusScore;
    score.textContent ="Score: " + totalScore;
}
//when user saves their name:
buttonSubmit.addEventListener("click",userName);
function userName() {
    playerInput.style.display = "none";
    playerName.textContent = userInput.value;
    records = [{
        player: userInput.value, playerScore: totalScore}]
    localStorage.setItem("userNames", JSON.stringify(records));

    
}
//game over
    //score
    //input name
        //when name is saved, save to local storage with the score
        //provide option to see scoreboards
