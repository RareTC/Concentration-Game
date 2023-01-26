/*----- constants -----*/
const FACE_CARDS = [
    {
        img:'images/air.png',
        matched: false,
        name: 'air'
    },
    {
        img:'images/appa.png',
        matched: false,
        name: 'appa'
    },
    {
        img:'images/earth.png',
        matched: false,
        name: 'earth'
    },
    {
        img:'images/fire.png',
        matched: false,
        name: 'fire'
    },
    {
        img:'images/group.png',
        matched: false,
        name: 'group'
    },
    {
        img:'images/water.png',
        matched: false,
        name: 'water'
    },
  
]
const BACK_CARD = 'images/background.png'
    
/*----- state variables -----*/
let wrong;
let timerId; 
let cards; 
let firstClick;
let secondClick;
let ignoreClick;
let gameStatus;

/*----- cached elements  -----*/
const boardEl = document.getElementById('board');
const cardImgEls = document.querySelector('section > img');
const countdownEl = document.getElementById('countdown');
const gameResultEl = document.getElementById('gameresult');
const wrongEl = document.querySelector('.wrong');
const startBtn = document.querySelector('.startbutton');
const resetBtn = document.querySelector('.resetbutton');
const backMusic = new Audio ('sound/backmusic.mp3');
const replayNoise = new Audio ('sound/replaynoise.mp3');
const winNoise = new Audio ('sound/winnoise.mp3');
const wrongNoise = new Audio ('sound/wrongnoise.mp3');

/*----- event listeners -----*/
boardEl.addEventListener('click', handleClick);
startBtn.addEventListener('click', function(){
    startCountDown();
});
resetBtn.addEventListener('click', function() {
    init();
    startCountDown();
    replayNoise.play();
    replayNoise.volume = 0.6;
    gameStatus = false;
    gameResultEl.innerText = '';
});
/*----- functions -----*/
init();
function init() {
    let firstLoad = true;
    cards = getShuffledCards();
    firstClick = null;
    secondClick = null;
    ignoreClick = false;
    wrong = 0;
    gameStatus = false;
    render();
}

function render() {
    checkWinner(); 
    renderBoard();
}
function startCountDown() {
    backMusic.loop=true;
    backMusic.play();
    backMusic.volume = 0.1;
    firstLoad = false;
    startBtn.style.visibility = 'hidden';
    let count = 120;
    countdownEl.innerText = count;
    let timerId = setInterval(function() {
        count--; 
        checkWinner();
        if (count) {
            countdownEl.innerText = count;
        } if (gameStatus === 'done') { 
            clearInterval(timerId)
            countdownEl.innerText = count;
            render();
        } if (count <= 0) { 
            clearInterval(timerId)
            countdownEl.innerText = count;
            render();
        }
    },1000);
}

function renderBoard() {
    resetBtn.style.visibility = gameStatus === 'done' ? 'visible' : 'hidden';
    cards.forEach(function(imgEl, idx) {
        const cardImgEl = document.getElementById(idx)
        const src = (imgEl.matched || imgEl === firstClick || imgEl === secondClick) ? imgEl.img : BACK_CARD;
        cardImgEl.src = src;
    });
    wrongEl.innerText = `Incorrect ${wrong}/5`;
}
    
function handleClick(evt) {
    const cardIdx = parseInt(evt.target.id)
    const card = cards[cardIdx];
    if (gameStatus === 'done' || isNaN(cardIdx) || ignoreClick || cards[cardIdx] === firstClick || firstLoad) return;
    if (firstClick) secondClick = card
    if (!firstClick) firstClick = card
    card.matched = true;
    if (firstClick?.img === secondClick?.img) {
        firstClick.matched =true
        secondClick.matched = true
        firstClick = null
        secondClick = null
    } 
    if (firstClick && secondClick) {
        ignoreClick = true;
        wrong ++; 
        wrongNoise.play();
        wrongNoise.volume = 1;
        setTimeout(function() {
            firstClick.matched = false;
            secondClick.matched = false;
            firstClick = null
            secondClick = null
            ignoreClick = false;
            render();
        }, 2000);
    }
    render()
}

function checkWinner(){
    const checkWinner = cards.every(function(card){
        return card.matched===true;
    });
    if (checkWinner === true) {
        gameResultEl.innerText = 'You won!';
        gameStatus = 'done';
        winNoise.play();
        winNoise.volume = 0.6;
        backMusic.pause();
        return 
    } else if (countdownEl.innerText === '0'){
        gameResultEl.innerText = 'You are out of time!';
        gameStatus = 'done';
    } else if (wrong === 5) {
        gameResultEl.innerText = "You are out of guesses";
        gameStatus = 'done';
    }
}
function getShuffledCards() {
    const tempCards = [];
    const cards = [];
    FACE_CARDS.forEach(function(card) {
        tempCards.push({...card}, {...card});
    });
    while (tempCards.length) {
        const rndIdx = Math.floor(Math.random() * tempCards.length);
        const rndCard = tempCards.splice(rndIdx, 1)[0];
        cards.push(rndCard);
    }
    return cards;
}
