import { atualizarPontuacao, getGameState, finalizarJogo, reiniciarJogo } from './game.js';
import { moverCobra, mudarDirecao, detectarColisao, desenharCobra, getSnakeState } from './snake.js';
import { gerarNovaComida, desenharComida, getFoodPosition } from './food.js';
import { configurarEntrada, obterDirecao } from './input.js';

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const CELL_SIZE = 20;
const FPS = 10; // Ajuste a velocidade aqui
let gameLoop;

function inicializarJogo() {
    reiniciarJogo();
    configurarEntrada();
    gerarNovaComida(getSnakeState().body);
    gameLoop = setInterval(atualizarJogo, 1000 / FPS);

    document.getElementById('startGameButton').addEventListener('click', () => {
      reiniciarJogo();
      clearInterval(gameLoop);
      gameLoop = setInterval(atualizarJogo, 1000 / FPS);
  });
}


function atualizarJogo() {
    const gameState = getGameState();
    if (gameState.isGameOver) {
        clearInterval(gameLoop);
        alert('Game Over! Pontuação final: ' + gameState.score);


        return;
    }

    mudarDirecao(obterDirecao());
    moverCobra();

    if (detectarColisao()) {
        finalizarJogo();
        return;
    }

    if (getSnakeState().comerComida(getFoodPosition())) {
        gerarNovaComida(getSnakeState().body);
        atualizarPontuacao(10); // Incrementa a pontuação em 10
    }

    desenharJogo();
}

function desenharJogo() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    desenharCobra(context, CELL_SIZE);
    desenharComida(context, CELL_SIZE);

    const gameState = getGameState();
    context.font = '16px Arial';
    context.fillStyle = '#000';
    context.fillText(`Pontuação: ${gameState.score}`, 10, 20);
    context.fillText(`Nível: ${gameState.level}`, 10, 40);
}



window.onload = inicializarJogo;