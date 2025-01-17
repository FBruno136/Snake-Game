import { gerarPosicaoAleatoria, posicaoEstaNaLista } from './utils.js';
import { getSnakeState } from './snake.js'


const GRID_SIZE = 20;
let foodPosition;


export function gerarNovaComida(snakeBody) {

    do {
        foodPosition = gerarPosicaoAleatoria(GRID_SIZE);
    } while (posicaoEstaNaLista(foodPosition, snakeBody));

}


export function desenharComida(context, cellSize) {
    context.fillStyle = 'red';
    context.fillRect(foodPosition.x * cellSize, foodPosition.y * cellSize, cellSize, cellSize);
}


export function getFoodPosition() {
    return foodPosition;
}