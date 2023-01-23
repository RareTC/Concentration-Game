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
let timer; // 2:00 timer per game
let cards; //
let win; //All cards matched 
let firstClick;
let secondClick;
let ignoreClick;

/*----- cached elements  -----*/
const cardImgEls = document.querySelector('section > img');
const playAgainBtn = document.querySelector('button');
const boardEl = document.getElementById('board');

/*----- event listeners -----*/
boardEl.addEventListener('click', handleClick);
//document.getElementById('')addEventListener('click', cardPick);
//playAgainBtn.addEventListener('click', init);

/*----- functions -----*/
init (); //initialized all state then call render

function init () {
    //initialize board with shuffled cards(2 cards per image)
    cards = getShuffledCards();
    firstClick = null;
    ignoreClick = false;
    //then verify the board has 2 of each, shuffled
    // timer = //2:00min;
    // points = 0;
    render ();
}

function render () {
    renderBoard ();

    // renderControls ();
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
    if (!firstClick) {
        firstClick = card
        render();
        console.log(firstClick, 'this is first click')
    }
    else {
        if (isNaN(cardIdx) || ignoreClick || cards[cardIdx] === firstClick) return;
    }
    secondClick = card
    console.log(secondClick, 'this is second click')
    render();
    if (firstClick.img === secondClick.img) {
    firstClick.matched = secondClick.matched = true
    firstClick = null 
    secondClick = null
    } 
    else {
        firstClick = null
    }
    //Reset clicks back to null
 render();
}

//--After event listener for click to save first and second click argument should check if matched --/
//--If match make both cards unclickable and fully transparent--//
//--If two clicks and no match, return code to previous and flip back over --/
// if (!imgEl.matched) {



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

// function renderControls () {
//     playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
// }