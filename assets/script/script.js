var question = document.querySelector('#questions');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var timerEl = document.querySelector('#timer-el');
var scoreEl = document.querySelector('#score-el');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let time = 100
let availableQuestions = []

let questions = [
  {
    question: "Who was the second president?",
    choice1: "Adams",
    choice2: "Madison",
    choice3: "Monroe",
    choice4: "Jefferson",
    answer: 1,
  },
  {
    question: "Who was president in 1971?",
    choice1: "Carter",
    choice2: "Ford",
    choice3: "Nixon",
    choice4: "Johnson",
    answer: 3,
  },
  {
    question: "Who was the 13th president?",
    choice1: "Polk",
    choice2: "Fillmore",
    choice3: "Taylor",
    choice4: "Pierce",
    answer: 2,
  },
  {
    question: "Who was president in 1957?",
    choice1: "Eisenhower",
    choice2: "Johnson",
    choice3: "Kennedy",
    choice4: "Truman",
    answer: 1,
  },
  {
    question: "Who was president in 1900?",
    choice1: "Harrison",
    choice2: "Roosevelt",
    choice3: "Cleveland",
    choice4: "McKinley",
    answer: 4,
  },
  {
    question: "Who was the 29th president?",
    choice1: "Taft",
    choice2: "Coolidge",
    choice3: "Wilson",
    choice4: "Harding",
    answer: 4,
  },
  {
    question: "Who was the 31st president?",
    choice1: "Hoover",
    choice2: "Truman",
    choice3: "Coolidge",
    choice4: "Grant",
    answer: 1,
  },
  {
    question: "Who was the 39th president?",
    choice1: "Clinton",
    choice2: "Bush",
    choice3: "Carter",
    choice4: "Reagan",
    answer: 3,
  },
  {
    question: "Who was the 20th president?",
    choice1: "Arthur",
    choice2: "Garfield",
    choice3: "Grant",
    choice4: "Hayes",
    answer: 2,
  },
  {
    question: "Who was the president in 1859?",
    choice1: "Van Buren",
    choice2: "Tyler",
    choice3: "Fillmore",
    choice4: "Buchanan",
    answer: 4,
  }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10


startGame = () => {
  score = 0
  timer = 100
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if(availableQuestions.length === 0 || time <= 0) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('/end.html')
  }


  var questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
  
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return

    acceptingAnswers = false
    const selectChoice = e.target
    const selectAnswer = selectChoice.dataset['number']

    let classToApply = selectAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if(classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()

    }, 1000)
  })
})

incrementScore = num => {
  score +=num
  scoreEL.innerText = score
}

startGame()


/*
var mainEl = document.querySelector('main');
var playBtnEl = document.querySelector('#play-btn');
var timerEl = document.querySelector('#time-el');

var interval;
var time = 100;
var questionIndex = 0;
var lastQuestion = '';

var questions = [
  {
    questionText: 'Who was the second president?',
    questionChoices: ['Adams', 'Madison', 'Monroe', 'Jefferson'],
    correctAnswer: 0
  },

  {
    questionText: 'Who was president in 1971?',
    questionChoices: ['Carter', 'Ford', 'Nixon', 'Johnson'],
    correctAnswer: 2
  }
];

function displayQuestion() {
  mainEl.innerHTML = "";

  if (questionIndex >= questions.length) {
    endGame();
    return;
  }

  var h1El = document.createElement('h1');
  h1El.textContent = questions[questionIndex].questionText;
  mainEl.appendChild(h1El);
  
  var btnDivEl = document.createElement("div");
  mainEl.appendChild(btnDivEl);

  var pEl = document.createElement('p');
  pEl.textContent = lastQuestion
  mainEl.appendChild(pEl);
  
  btnDivEl.addEventListener('click', function(event){
    var target = event.target;
  
    console.log(target.getAttribute("class"))
  
    if (target.getAttribute("class") !== 'btn') return;

    var clickedQuestionIndex = parseInt(target.getAttribute('data-index'));

    console.log(clickedQuestionIndex);
    if (clickedQuestionIndex === questions[questionIndex].correctAnswer) {

      lastQuestion = "Correct"

    } else {
      time = time - 10;
      lastQuestion = "Incorrect"
    }

    questionIndex++;
  
    displayQuestion();
  
  });
  
  for (var i = 0; i < questions[questionIndex].questionChoices.length; i++) {
    var buttonEl = document.createElement('button');
    buttonEl.textContent = questions[questionIndex].questionChoices[i];
    buttonEl.setAttribute("class", 'btn');
    buttonEl.setAttribute('data-index', i);
    btnDivEl.appendChild(buttonEl);
  }


};


playBtnEl.addEventListener('click', function (event) {
  console.log('hit')

  mainEl.innerHtml = '';
  
  interval = setInterval(function() {
    time--;
    timerEl.textContent = `Time: ${time}`; 

    if (time <= 0) {
      clearInterval(interval);
      endGame();
      return;
    }
  
  }, 1000);

  displayQuestion();

});


function endGame() {
  clearInterval(interval)

};
}
*/