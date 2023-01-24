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
let points; //1 point per matched pair 
let countdown; // 2:00 timer per game
let cards; //
let winner; //All cards matched 
let firstClick;
let secondClick;
let ignoreClick;

/*----- cached elements  -----*/
const cardImgEls = document.querySelector('section > img');
const playAgainBtn = document.querySelector('button');
const boardEl = document.getElementById('board');
const countdownEl = document.getElementById('countdown');
const gameResultEl = document.getElementById('gameresult');
const playNowbtn = document.getElementById('starbutton');

/*----- event listeners -----*/
boardEl.addEventListener('click', handleClick);
playNowbtn.addEventListener('click', renderCountDown);
playAgainBtn.addEventListener('click', init);

/*----- functions -----*/
init (); //initialized all state then call render

function init () {
    //this shuffles cards with 2 matches 
    cards = getShuffledCards();
    firstClick = null;
    secondClick = null;
    ignoreClick = false;
    winner = null;
    // countdown = renderCountDown;
    // points = 0;
    renderCountDown ();

    render ();
}

function render () {
    renderBoard ();
    // renderControls ();
}

function renderCountDown () {
    let count = 120
    countdownEl.innerText = count;
    let timerId = setInterval(function() {
        count--;
        if (count) {
            countdownEl.innerText = count;
        } else {
            clearInterval(timerId)
            gameResultEl.innerText = 'Time is up! You Lose'
        }
    },1000);
}

function renderBoard () {
    cards.forEach(function(imgEl, idx) {
        const cardImgEl = document.getElementById(idx)
        const src = (imgEl.matched || imgEl === firstClick || imgEl === secondClick) ? imgEl.img : BACK_CARD;
        cardImgEl.src = src;
    });
}
// if (imgEl.matched || firstClick === imgEl || secondClick == imgEl){
//     src = imgEl.img
// } else {
//     src = BACK_CARD.img
// }

    
function handleClick(evt) {
    const cardIdx = parseInt(evt.target.id)
    const card = cards[cardIdx];
    if (isNaN(cardIdx) || ignoreClick || cards[cardIdx] === firstClick) return;
    if (firstClick) secondClick = card
    if (!firstClick) firstClick = card
    card.matched = true;

    if (firstClick?.img === secondClick?.img) {
        firstClick.matched =true
        secondClick.matched = true
        firstClick = null
        secondClick = null
        // render();
    } 
    if (firstClick && secondClick) {
        console.log(firstClick, secondClick);
        ignoreClick = true;
        //set time out starts here 
        setTimeout(function(){

            firstClick.matched = false;
            secondClick.matched = false;
            firstClick = null
            secondClick = null
            ignoreClick = false;
            render();
        }, 2000);
        //make a set time out before setting first and second clicks to false then call render
    }
    //Reset clicks back to null
    render()
}

function getShuffledCards() {
    const tempCards = [];
    //array to be returned
    const cards = [];
    //copy each source card twice and add to tempCards
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

function renderControls () {
    playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
}

function getWinner () {
    console.log("Inside Winner Function");
    const checkWinner = cards.every(function(card) {
        return card.matched === true;
    });
    console.log(checkWinner);
    if (checkWinner === true) {
        console.log('You win');
    }
}