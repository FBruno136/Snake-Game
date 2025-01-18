import { atualizarPontuacao, getGameState, finalizarJogo, reiniciarJogo } from './game.js';
import { moverCobra, mudarDirecao, detectarColisao, desenharCobra, getSnakeState } from './snake.js';
import { gerarNovaComida, desenharComida, getFoodPosition } from './food.js';
import { configurarEntrada, obterDirecao } from './input.js';

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const CELL_SIZE = 20;
const FPS = 10;
let gameLoop;
let jogoIniciado = false;

document.getElementById('startGameButton').addEventListener('click', () => {
    if (!jogoIniciado) {
        jogoIniciado = true;

        // Torna visível o contêiner do jogo e oculta o botão de início
        document.getElementById('gameContainer').style.display = 'block';
        document.getElementById('startGameButton').style.display = 'none';

        inicializarJogo(); 
    }
});

configurarEntrada(); 

function inicializarJogo() {
    reiniciarJogo();
    gerarNovaComida(getSnakeState().body);  
    iniciarLoop(); 
}

function iniciarLoop() {
    gameLoop = setInterval(atualizarJogo, 1000 / FPS); 
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

    const snake = getSnakeState(); 
    if (snake.comerComida(getFoodPosition())) {
        gerarNovaComida(snake.body); 
        atualizarPontuacao(1);
    }

    desenharJogo();
}

function desenharJogo() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    desenharCobra(context, CELL_SIZE);
    desenharComida(context, CELL_SIZE);

    const gameState = getGameState();
    const scoreDiv = document.getElementById('score');
    const levelDiv = document.getElementById('level');
    scoreDiv.textContent = `Pontuação: ${gameState.score}`;
    levelDiv.textContent = `Nível: ${gameState.level}`;
}