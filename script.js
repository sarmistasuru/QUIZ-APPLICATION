const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn'); 
const quizSelection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const nextBtn = document.querySelector('.next-btn');
const optionalist = document.querySelector('.option-list');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryagain-btn');
const gohomeBtn = document.querySelector('.gohome-btn');

startBtn.onclick = () => {
  popupInfo.classList.add('active');
  main.classList.add('active');
};

exitBtn.onclick = () => {
  popupInfo.classList.remove('active');
  main.classList.remove('active');
};

continueBtn.onclick = () => {
  quizSelection.classList.add('active');
  popupInfo.classList.remove('active');
  main.classList.remove('active');
  quizBox.classList.add('active');

  showQuestions(0);
  updateQuestionCounter(1);
  headerScore()
};

tryAgainBtn.onclick = () => {
  quizBox.classList.add('active');
  nextBtn.classList.remove('active');
  resultBox.classList.remove('active');

 questionCount = 0;
 questionNumb = 1;
 userScore = 0 ;
 showQuestions(questionCount);
 updateQuestionCounter(questionNumb);
 headerScore();
};

gohomeBtn.onclick = () => {
  quizSelection.classList.remove('active');
  nextBtn.classList.remove('active');
  resultBox.classList.remove('active');

 questionCount = 0;
 questionNumb = 1;
 userScore = 0 ;
 showQuestions(questionCount);
 updateQuestionCounter(questionNumb);
 headerScore();
};

let questionCount = 0;
let questionNumb = 1;
let userScore = 0 ;

nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    showQuestions(questionCount);

    questionNumb++;
    updateQuestionCounter(questionNumb);
    nextBtn.classList.remove('active');
  } else {
   
    showResultBox();
  }
};

// Getting question and options from array
function showQuestions(index) {
  const questionText = document.querySelector('.question-text');
  questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;
  
  let optionTags = '';
  questions[index].options.forEach(option => {
    optionTags += `<div class="option"><span>${option}</span></div>`;
  });
  
  optionalist.innerHTML = optionTags;

  const option = document.querySelectorAll('.option');
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)');
  }
}

function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOptions = optionalist.children.length;

  if (userAnswer == correctAnswer) {
    answer.classList.add('correct');
    userScore +=1;
    headerScore();
  } else {
    answer.classList.add('incorrect');

    //if answer incorrect, auto selected correct  answer
    for (let i = 0; i < allOptions; i++) {
      if(optionalist.children[i].textContent == correctAnswer){optionalist.children[i].setAttribute('class','option correct');
      }
      
    }
  }

  // If the user has selected an option, disable all options
  for (let i = 0; i < allOptions; i++) {
    optionalist.children[i].classList.add('disabled');
  }

  nextBtn.classList.add ('active');
}

function updateQuestionCounter(index) {
  const questionTotal = document.querySelector('.question-total');
  questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
  const headerScoreText = document.querySelector('.header-score');
  headerScoreText.textContent = `score: ${userScore} / ${questions.length}`;
}


function showResultBox(){
  quizBox.classList.remove('active');
 resultBox.classList.add('active');

 const ScoreText = document.querySelector('.score-text');
ScoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;


const circularProgress = document.querySelector('.circular-process');
const progressValue = document.querySelector('.process-value');


let progressStartValue = -1;
  let progressEndValue = (userScore / questions.length)*100;
  let speed = 20;

let progress = setInterval(() => {
  progressStartValue++;
  // console.log(progressStartValue);
  progressValue.textContent = `${progressStartValue}%`;
  circularProgress.style.background = `conic-gradient(#c91569 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`;

  if(progressStartValue == progressEndValue ) {
    clearInterval(progress);
  }
}, speed);
}