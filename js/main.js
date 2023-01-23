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
const BACK_CARD = 
    {
        img: 'images/background.png',
        name: 'background'
    }
/*----- state variables -----*/
let points; //1 point per matched pair 
let timer; // 2:00 timer per game
let cards; //
let win; //All cards matched 
let firstClick;
let secondClick;

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
    //then verify the board has 2 of each, shuffled
    console.log(cards);
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
        const src = (imgEl.matched || imgEl === firstClick || imgEl === secondClick) ? imgEl.img : BACK_CARD.img;
        cardImgEl.src = src;
        console.log (cardImgEl);
        console.log(imgEl);
        console.log(firstClick);
    });
}
function handleClick(evt) {
    let cardIdx = parseInt(evt.target.id)
    let card = cards[cardIdx];
    if (!firstClick) {
        firstClick = card
        render();
    }

    console.log(cardIdx)
   
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