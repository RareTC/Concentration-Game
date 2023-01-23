/*----- constants -----*/
const FACE_CARDS = [
    {
        img:'images/air.png',
        matched: false
    },
    {
        img:'images/appa.png',
        matched: false
    },
    {
        img:'images/earth.png',
        matched: false
    },
    {
        img:'images/fire.png',
        matched: false
    },
    {
        img:'images/group.png',
        matched: false
    },
    {
        img:'images/water.png',
        matched: false
    },
  
]
const BACK_CARD = [
    {
        img: 'images/background.png'
    }
    
]


/*----- state variables -----*/
let points; //1 point per matched pair 
let timer; // 2:00 timer per game
let board; //
let win; //All cards matched 

/*----- cached elements  -----*/
const cardImgEls = document.querySelectorAll('section > img');
const playAgainBtn = document.querySelector('button');

/*----- event listeners -----*/
//document.getElementById('board')addEventListener('click', cardPick);
//playAgainBtn.addEventListener('click', init);

/*----- functions -----*/
init (); //initialized all state then call render

function init () {
    //initialize board with shuffled cards(2 cards per image)
    board = getShuffledCards();
    //then verify the board has 2 of each, shuffled
        console.log(board);
    // timer = //2:00min;
    // points = 0;
    render ();
}

function render () {
    renderBoard ();
    // renderControls ();
}

function renderBoard () {
    cardImgEls.forEach(function(imgEl) {
        cardImgEls.src = BACK_CARD
    });
}

// function renderControls () {
//     playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
// }


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
