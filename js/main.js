/*----- constants -----*/
const CARDS = [
    {
        name: 'back'
        img: 'images/back.png'
    }
    {}
    {}
    {}
    {}
    {}
    {}
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
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    timer = //2:00min;
    points = '0';
    render ();
}
