//Apply DOM Elements
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
//Apply quiz variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
  //Hiding start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
  //Reveal questions
  questionsEl.removeAttribute("class");
  //Timer starts ticking
  timerId = setInterval(clockTick, 1000);
  //Reveal starting time
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  //Obtain current question item from array
  var currentQuestion = questions[currentQuestionIndex];
  //Update current question title
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  //Remove old question choices
  choicesEl.innerHTML = "";

  //Choice loop
  currentQuestion.choices.forEach(function(choice, i) {
    //New button created for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    //Click event listener attached to each choice
    choiceNode.onclick = questionClick;

    //Page display
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  //Checks if a question was answered incorrectly
  if (this.value !== questions[currentQuestionIndex].answer) {
    //Subtract time if user answers a question incorrectly
    time -= 15;

    if (time < 0) {
      time = 0;
    }
    //Show new time based on question answers
    timerEl.textContent = time;
    //Setting up feedback parameters
    feedbackEl.textContent = "Wrong";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "300%";
  } else {
    feedbackEl.textContent = "Correct";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "300%";
  }

  //Show wrong or correct messages based on answer
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);
  //Next question
  currentQuestionIndex++;
  //Check time
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  //End timer
  clearInterval(timerId);
  //Reveal end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
  //Reveal final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
  //Hide questions
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  //Update timer
  time--;
  timerEl.textContent = time;
  //Checks to see if the user has no remaining time left
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  //Obtain value of input box
  var initials = initialsEl.value.trim();
  if (initials !== "") {
    //Obtain scores from local storage or set to an empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };
    //Saves to local storage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    //Redirect to scoreboard
    window.location.href = "quiz.html";
  }
}

function checkForEnter(event) {
  //Saves score upon pressing enter
  if (event.key === "Enter") {
    saveHighscore();
  }
}

//Submit high score initials
submitBtn.onclick = saveHighscore;
//Start the quiz
startBtn.onclick = startQuiz;
initialsEl.onkeyup = checkForEnter;