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

const drawSnake = () => {
    snake.forEach( square => drawSquare(square, 'snakeSquare'));
}

// Rellena cada cuadrado del tablero
// @params
// square: posicion del cuadrado
// type: tipos de cuadrado (emptySquare, snakeSquare, foodSquare)
const drawSquare = (square, type) => {
    const [row, column] = square.split('');
    boardSquares [row][column] = squareTypes[type];
    const squareElement = document.getElementById(square);
    squareElement.setAttribute('class', `square ${type}`); // El metodo "setAttribute()" sirve para cambiar o añadir cualquier atributo de un elemento HTML como (id, class, src, href, etc.), Y lo que esta dentro de los parentesis  es la forma como se le indica que atributo se va a cambiar y separado por una coma el elemento y el valor que se le va a asignar "...('class', `square ${type}`)."

    if (type === 'emptySquare') { // Traduccion: Si el cuadrito que estamos pintando es de tipo "emptySquare" solo si es verdadero entonces pasa a el contenido de deste condicional. // El operador "===" es no solo para comparar los valores si no para comparar el tipo de dato.    

        emptySquares.push(square);

    }else{
        if(emptySquares.indexOf(square) !== -1) { // Esta linea se traduce como una pregunta; si la posicion que está en "square" está dentro de la lista de vacios "emptySquares" y esta es distinta a -1 (osea: no se encuentra entre los indices de las pociciones) solo si esto es verdad entonces procede a el contenido del condicional.
            emptySquares.splice(emptySquares.indexOf(square), 1); // Este metodo ".splice" es para sacar el elemento espesificado de la lista "emptySquares", el cual es el que se le espesifica con el "indexOf()" y espesificando tambien cuantos va a borrar con el numero que le sigue al final de la linea del codigo.
        } 
    }

}

const createBoard = () => {
    emptySquares = [];
    boardSquares.forEach( (row, rowIndex) => {
        row.forEach( (column, columnIndex) => {
            const squareValue = `${rowIndex}${columnIndex}`;
            const squareElement = document.createElement('div');
            squareElement.setAttribute('class', 'square emptySquare');
            squareElement.setAttribute('id', squareValue);
            board.appendChild(squareElement); // Esta liena hace que cada vez que creemos un suqareElement este se le agregue a el board
            emptySquares.push(squareValue);
        })
    })
}

const setGame = () => { // Esta funcion lo que hace es configurar el juego inicialmente para poder visualizar la serpiente, ver el puntaje, ver la direccion en que va la serpiente y la tabla donde va a estar la serpiente
    snake = ['00', '01', '02', '03'];
    score = snake.length;
    direction = 'ArrowRight';
    boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare)); // Esta linea de codigo hace que el array se cree y al mismo tiempo se vaya creando los definidos espacios vacios en las dos dimenciones de dicha tabla
    console.log(boardSquares);
    board.innerHTML = '';
    emptySquares = [];
    createBoard();
};

const startGame = () => {
    setGame();
    gameOverSing.style.display = 'none';
    startButton.disabled = true; // Con esta linea logramos bloquear la funcion de iniciar el juego una vez ya se haya iniciado el juego mientras este esté en curso.
    drawSnake();
};

startButton.addEventListener('click', startGame);