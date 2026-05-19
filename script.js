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

// El metodo "setAttribute()" sirve para cambiar o añadir cualquier atributo de un elemento HTML como (id, class, src, href, etc.), Y lo que esta dentro de los parentesis  es la forma como se le indica que atributo se va a cambiar y separado por una coma el elemento y el valor que se le va a asignar "...('class', `square ${type}`)."
// Traduccion del if: Si el cuadrito que estamos pintando es de tipo "emptySquare" solo si es verdadero entonces pasa a el contenido de deste condicional. // El operador "===" es no solo para comparar los valores si no para comparar el tipo de dato.
// 2do "if" esta linea se traduce como una pregunta; si la posicion que está en "square" está dentro de la lista de disponibles "emptySquares" y esta es distinta a -1 (osea: no se encuentra entre los indices de las pociciones) solo si esto es verdad entonces procede a el contenido del condicional.
// Este metodo ".splice" es para sacar el elemento espesificado de la lista "emptySquares", el cual es el que se le espesifica con el "indexOf()" y espesificando tambien cuantos va a borrar con el numero que le sigue al final de la linea del codigo.
const drawSquare = (square, type) => {
    const [row, column] = square.split('');
    boardSquares [row][column] = squareTypes[type];
    const squareElement = document.getElementById(square);
    squareElement.setAttribute('class', `square ${type}`); 

    if (type === 'emptySquare') {   

        emptySquares.push(square);

    }else{
        if(emptySquares.indexOf(square) !== -1) {
            emptySquares.splice(emptySquares.indexOf(square), 1);
        } 
    }

}

// Las llaves en el arreglo snake son la forma como se accede a los elementos de este arreglo // Lo que hace esta linea de codigo es encontrar el ultimo cuadro del cuerpo de la serpiente osea la cabeza. // 'Number() es un metodo para transformar el texto en numero, al querer sumar 'directions[direction]' encontraremos que es un string y no es posible sumar numeros con caracteres.
// Esta linea corrige el numero del ID que nos estrega la linea anterior a esta ya que si el numero viene sin el cero delante "En el caso que lo requiera" este se lo va a agregar. // Este metodo ".padStart()" es para validar el resutado anterior (linea 57 y 58) diciendole: "el resultado deben ser de dos caracteres y si le falta algun caracter rellenalo con cero" // Podemmos ver que esta lina comienza con un metodo que inicia con un punto esto es porque es solo la continuacion de la instruccion de la linea 58 asi como lo es la linea 58 de la 57.
// El codigo "const [row, column]" no está creando un arrglo, lo que hace es igualar el proceso que esta a la derecha del igual y guardar cada resultado de este en cada variable del lado izquierdo del igual.
const moveSnake = () => {
    const newSquare = String(
        Number(snake[snake.length - 1]) + directions[direction])
        .padStart(2, '0');
    const [row, column] = newSquare.split('');

    if( newSquare < 0 ||
        newSquare >= boardSize * boardSize ||
        (direction === 'ArrowRight' && column == 0) ||
        (direction === 'ArrowLeft' && column == 9) ||
        boardSquares[row][column] === squareTypes.snakeSquare){
        gameOver();
        }else {
            snake.push(newSquare); // ".push()" es un metodo para empujar un elemento al final de un arreglo.
            if( boardSquares[row][column] === squareTypes.foodSquare) {
                addFood()
            }else{
                const emptySquare = snake.shift(); // ".shift()" es un metodo que sirve para eliminar el primer elemento o indice de un arreglo y nos lo devuelve, esto quiere decir que el resultado de la accion del metodo ".shift()" lo guarda en la variable "emptySquare".
                drawSquare(emptySquare, 'emptySquare');
            }
            drawSnake();
        }
}

const addFood = () => {
    score++;
    updateScore();
    createRandomFood();
}

const gameOver = () => {
    gameOverSing.style.display = 'block';
    clearInterval(moveInterval)
    startButton.disabled = false;
}

const setDirection = newDirection => {
    direction = newDirection;
}

// En la linea 62 'event' esto es un objeto donde esta espesificado todo lo relacionado con el envento de presionar la tecla
// En la linea 65 los prametros (event.code) cumplen la funcion de mostrar que tecla es la que se esta presionando. (Teniendo en cuenta que .code es una propiedad del objeto que se le pasa a directionEvent al momento en que que utiliza con un addEventListener en la funcion startGame).
const directionEvent = event => {
    switch (event.code) {
        case 'ArrowUp':
            direction !== 'ArrowDown' && setDirection(event.code)
            break;
        case 'ArrowDown':
            direction !== 'ArrowUp' && setDirection(event.code)
            break;
        case 'ArrowRight':
            direction !== 'ArrowLeft' && setDirection(event.code)
            break;
        case 'ArrowLeft':
            direction !== 'ArrowRight' && setDirection(event.code)
            break;
    }
}

// Esta funcion solo es para cuando se inicializa el juego osea que esta funcion solo se llama en la funcion "startGame"; ya que es para dar una posicion inicial del la comida al presionar startGame.
// "const randomEmptySquare..." esta linea de codigo lo que hace es: En "(Math.random() * emptySquares.length()" toma un numero aleatorio entre 0 y 1 y este lo multiplica por el numero de cuadrados vacios del juego y luego este numero que resulte es redondeado hacia abajo con "Math.floor(Math.random()...)"
const createRandomFood = () => {
    const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    drawSquare(randomEmptySquare, 'foodSquare');
}

const updateScore = () => {
    scoreBoard.innerText = score;
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
    snake = ['00', '01', '02'];
    score = snake.length - 3;
    direction = 'ArrowRight';
    boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare)); // Esta linea de codigo hace que el array se cree y al mismo tiempo se vaya creando los definidos espacios vacios en las dos dimenciones de dicha tabla
    console.log(boardSquares);
    board.innerHTML = '';
    emptySquares = [];
    createBoard();
};

// "moveInterval = setInterval..."Esta linea hace que la serpiente se mueva cada cierta cantidad de tiempo y esto se logra con una funcion propia del lenguaje 'setInterval()' esta repite la instruccion que le indiquemos (mover la serpiente) luego de pasar una cantidad espesifica de tiempo, donde el primer parametro es '() => moveSnake()' y es la acciona a realizar y 'gameSpeed' es el tiempo a esperar para repetir nuevamente la accion donde su valor es de '100' pero esto en realidad representa en segundos '0.1 segundos' quiere decir que cada 0.1 segundos la funcion 'setInterval' está ejecutandose, teniendo en cuentra que cada accion espera que el intervalo que va delante de este se ejecute hasta terminar para luego este realizar nuevamente la accion.
const startGame = () => {
    setGame();
    gameOverSing.style.display = 'none';
    startButton.disabled = true; // Con esta linea logramos bloquear la funcion de iniciar el juego una vez ya se haya iniciado el juego mientras este esté en curso.
    drawSnake();
    updateScore();
    createRandomFood();
    moveInterval = setInterval( () => moveSnake(), gameSpeed);
};

startButton.addEventListener('click', startGame); // Esta linea utiliza el "addEventListener()" donde tiene como parametro 1°) el tipo de entrada o evento que espera escuchar y siguiente a esto 2°) la funcion que se va a ejecutar al presionar esta entrada que se espera que este caso es un 'click'.
document.addEventListener('keydown', directionEvent);