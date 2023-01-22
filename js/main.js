/*----- constants -----*/
const CARDS = [
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
const BOARD = document.querySelector.apply('.board')

/*----- state variables -----*/
let points;
let timer;
let board;

/*----- cached elements  -----*/


/*----- event listeners -----*/


/*----- functions -----*/
init ();

function init () {
    board = getShuffledTiles()
    timer = //2:00min;
    points = '0';
    render ();
}
