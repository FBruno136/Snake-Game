import { atualizarPontuacao, finalizarJogo, reiniciarJogo, getGameState } from './game.js';
import { moverCobra, mudarDirecao, detectarColisao, desenharCobra } from './snake.js';
import { gerarNovaComida, desenharComida, getFoodPosition } from './food.js';
import { renderizarJogo } from './render.js';
import { configurarEntrada, obterDirecao } from './input.js';

// Variáveis globais
let gameLoop;
const FPS = 60;
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const CELL_SIZE = 20;

// Configurar entrada ao iniciar o jogo
configurarEntrada();

function atualizar() {
    const novaDirecao = obterDirecao();
    mudarDirecao(novaDirecao); // Atualiza a direção da cobra
    moverCobra();
    if (detectarColisao()) {
        finalizarJogo(); // Game Over
    }
    renderizar();
}

// No loop de atualização do jogo
function renderizar() {
    const snakeState = getSnakeState();
    const foodPosition = getFoodPosition();

    renderizarJogo(context, CELL_SIZE, snakeState.body, foodPosition);
}

// Função de inicialização
function inicializar() {
    canvas = document.getElementById('game-board');
    context = canvas.getContext('2d');

    canvas.width = 600;  // Largura do tabuleiro
    canvas.height = 400; // Altura do tabuleiro

    // Configuração inicial do jogo
    resetarJogo();

    // Iniciar o loop do jogo
    gameLoop = setInterval(atualizar, 1000 / FPS);
}
// Inicializar a comida ao começar o jogo
gerarNovaComida(getSnakeState().body);

// No loop de atualização do jogo
function atualizar() {
    const snakeState = getSnakeState();

    // Verifica se a cobra comeu a comida
    if (comerComida(getFoodPosition())) {
        gerarNovaComida(snakeState.body);
    }

    // Atualiza e renderiza o jogo
    moverCobra();
    if (detectarColisao()) {
        finalizarJogo(); // Game Over
    }
    renderizar();
}

// Renderizar no canvas
function renderizar() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    desenharCobra(context, CELL_SIZE);
    desenharComida(context, CELL_SIZE);
}

// Função para resetar o estado do jogo
function resetarJogo() {
    // Configurar estado inicial (nível, pontuação, posição inicial da cobra)
    // Exemplo inicial:
    window.gameState = {
        score: 0,
        level: 1,
        speed: 200, // Velocidade inicial da cobra
        isGameOver: false
    };

    // Iniciar componentes, como a cobra e comida
    // Pode chamar funções de outros módulos, ex:
    // inicializarCobra();
    // gerarComida();
}

// Função de atualização do jogo
function atualizar() {
    if (window.gameState.isGameOver) {
        clearInterval(gameLoop);
        alert('Game Over! Tente novamente.');
        return;
    }

    // Atualizar lógica do jogo
    // moverCobra();
    // verificarColisões();
    // atualizarNível();

    // Renderizar o tabuleiro
    renderizar();
}

// Função de renderização
function renderizar() {
    // Limpar o canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar elementos do jogo
    // desenharCobra(context);
    // desenharComida(context);

    // Desenhar informações como pontuação e nível
    context.font = '16px Arial';
    context.fillStyle = '#000';
    context.fillText(`Score: ${window.gameState.score}`, 10, 20);
    context.fillText(`Level: ${window.gameState.level}`, 10, 40);
}

// Evento para capturar teclas e mudar a direção
document.addEventListener('keydown', (e) => {
    const direcoes = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 }
    };
    if (direcoes[e.key]) {
        mudarDirecao(direcoes[e.key]);
    }
});

// No loop de atualização do jogo
function atualizar() {
    moverCobra();
    if (detectarColisao()) {
        finalizarJogo(); // Game Over
    }
    renderizar();
}

// Iniciar o jogo ao carregar a página
window.onload = inicializar;
