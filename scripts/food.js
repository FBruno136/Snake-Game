import { gerarPosicaoAleatoria, posicaoEstaNaLista } from './utils.js';

// Estado inicial da comida
let foodPosition = { x: 5, y: 5 }; // Posição inicial da comida

// Define o tamanho do grid (tabuleiro)
const GRID_SIZE = 20;

// Gera uma posição aleatória no grid
function gerarPosicaoAleatoria() {
    return {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
    };
}

// Gera a posição da comida, evitando o corpo da cobra
export function gerarNovaComida(snakeBody) {
    let novaPosicao;

    do {
        novaPosicao = gerarPosicaoAleatoria(GRID_SIZE);
    } while (posicaoEstaNaLista(novaPosicao, snakeBody));

    foodPosition = novaPosicao;
}

// Renderiza a comida no tabuleiro
export function desenharComida(context, cellSize) {
    context.fillStyle = 'red';
    context.fillRect(
        foodPosition.x * cellSize, 
        foodPosition.y * cellSize, 
        cellSize, 
        cellSize
    );
}

// Obtém a posição atual da comida
export function getFoodPosition() {
    return foodPosition;
}
