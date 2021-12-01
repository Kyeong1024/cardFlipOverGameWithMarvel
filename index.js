//haha i changed
//++ i changed again
const $cells = document.querySelectorAll('.cell');
const $message = document.querySelector('.message');
const $startButton = document.querySelector('.start-button');
const $cardGameFrame = document.querySelector('#card-game');
const $resultImage = document.querySelector('.result-image');
const $timer = document.querySelector('.timer');
const $endImage = document.querySelector('.end-image');
const RESTART = 'Restart';
const audio = new Audio('./music/inspire.mp3');
const Images = [
  'blackwidow',
  'captainamerica',
  'deadpool',
  'doctorstrange',
  'groot',
  'hulk',
  'ironman',
  'thanos',
  'spiderman',
  'thor'
];
let timerId;
let countNumber = 0;
let sameCard = [];
let filped = [];
let filpedCheck = [];
let cilckable = false;
let buttonClickable = true;
let isWin = false;

$startButton.addEventListener('click', function () {
  if (!buttonClickable) return;
  if ($startButton.textContent === RESTART) {
    reset();
  }
  cilckable = true;
  buttonClickable = false;
  shuffleCard();
  $resultImage.style.display = 'none';
  $cardGameFrame.style.display = 'block';
  audio.play();
});

function timer() {
  let leftTime = 30;
  $timer.textContent = `${leftTime}초 남았습니다.`;
  timerId = setInterval(() => {
    leftTime--;
    $timer.textContent = `${leftTime}초 남았습니다.`;
    if (leftTime === 0) {
      showResult();
    }
  }, 1000);
}

function shuffleCard() {
  const shuffle = [];
  const copyImages = Images.concat(Images);

  for (let i = 0; 0 < copyImages.length; i++) {
    const randomNumber = Math.floor(Math.random() * copyImages.length);
    const randomImage = copyImages.splice(randomNumber, 1)[0];
    shuffle.push(randomImage);
  }

  $cells.forEach(function (cell, i) {
    const frontImage = document.createElement('img');
    const backImage = document.createElement('img');
    frontImage.className = 'front-card';
    backImage.className = 'back-card';
    backImage.id = shuffle[countNumber];
    frontImage.src = './images/marvel.jpg';
    backImage.src = `./images/${shuffle[countNumber]}.jpg`;
    countNumber++;
    cell.appendChild(backImage);
    cell.appendChild(frontImage);
    setTimeout(() => {
      frontImage.style.visibility = 'hidden'
    }, 1000 + 100 * i);
    cell.addEventListener('click', clickImage);
  });
  const $frontImage = document.querySelectorAll('.front-card');
  setTimeout(() => {
    $frontImage.forEach((frontImage) => frontImage.style.visibility = 'visible');
    timer();
  }, 4500);
}

function clickImage(e) {
  if (filped.length === 2 || e.target.className !== 'front-card' || !cilckable) return;
  e.target.style.visibility = 'hidden';
  filpedCheck.push(e.target);
  filped.push(e.path[1].firstChild.id);

  if (filped.length === 2) {
    if (filped[0] === filped[1]) {
      sameCard.push(filped[0]);
      filped = [];
      filpedCheck = [];
    } else if (filped[0] !== filped[1]) {
      setTimeout(() => {
        filpedCheck[0].style.visibility = 'visible';
        filpedCheck[1].style.visibility = 'visible';
        filped = [];
        filpedCheck = [];
      }, 300);
    }
  }

  if (sameCard.length === Images.length) {
    setTimeout(() => {
      isWin = true;
      showResult();
    }, 0);
  }
}

function showResult() {
  clearInterval(timerId);
  audio.pause();
  audio.currentTime = 0;
  cilckable = false;
  buttonClickable = true;
  $startButton.textContent = RESTART;
  $cardGameFrame.style.display = 'none';
  $resultImage.style.display = 'block';
  $endImage.src = isWin ? './images/win.jpg' : './images/lose.jpg';
}

function reset() {
  sameCard = [];
  countNumber = 0;
  isWin = false;
  $cardGameFrame.style.display = 'block';
  $resultImage.style.display = 'none';
  $timer.textContent = '';
  $cells.forEach((inner) => { inner.innerHTML = '' })
}
