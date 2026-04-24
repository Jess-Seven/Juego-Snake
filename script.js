// HTML Elementos
const board = document.getElementById('board');
const scoreBoard = document.getElementById('scoreBoard');
const startButton = document.getElementById('start');
const gameOverSing = document.getElementById('gameOver');

//Configuraciones de elementos
const boardSize = 10;
const gameSpeed = 100;
const squareTypes = {
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2,
};
const directions = {
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft: -1,
};

// Variables del juego
let snake;
let score;
let direction;
let boardSquares;
let emptySquares;
let moveInterval;

const createBoard = () => {
    emptySquares = [];
    boardSquares.forEach( (row, rowIndex) => {
        row.forEach( (column, columnndex) => {
            const squareValue = '${rowIndex}${columnndex}';
            const squareElement = document.createElement('div');
            squareElement.setAttribute('class', 'square emptySquare');
            squareElement.setAttribute('id', squareValue);
            board.appendChild(squareElement); // Esta liena hace que cada vez que creemos un suqareElement este se le agregue a el board
            emptySquares.push(squareValue);
        })
    })
}

const setGame = () => { // Esta funcion lo que hace es configurar el juego inicialmente para poder visualizar la serpiente, ver el puntaje y ver la direccion en que va la serpiente
    snake = ['00', '01', '02', '03'];
    score = snake.length;
    direction = 'ArrowRight';
    boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare)); // Esta linea de codigo hace que el array se cree y al mismo tiempo se vaya creando los definidos espacios vacios en las dos dimenciones de dicha tabla
    console.log(boardSquares);
    board.innetHTML = '';
    emptySquare = [];
    createBoard();
};

const startGame = () => {
    setGame();
};

startButton.addEventListener('click', startGame);