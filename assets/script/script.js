var mainEl = document.querySelector('main');
var playBtnEl = document.querySelector('#play-btn');
var timerEl = document.querySelector('#time-el');

var interval;
var time = 100;
var questionIndex = 0;
var lastQuestion = '';

var questions = [
  {
    questionText: 'favorite color?',
    questionChoices: ['red', 'white', 'blue', 'pink'],
    correctAnswer: 0
  },
  {
    questionText: 'favorite season?',
    questionChoices: ['spring', 'summer', 'fall', 'winter'],
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
