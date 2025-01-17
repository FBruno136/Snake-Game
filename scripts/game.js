// game.js

// Estado do jogo
const gameState = {
    score: 0,
    level: 1,
    foodEaten: 0,
    speed: 150, 
    isGameOver: false
};

// Atualiza o nível do jogo
export function atualizarNivel() {
    if (gameState.foodEaten >= 25) {
        gameState.level++;
        gameState.speed = Math.max(50, gameState.speed / 2); // Dobra a velocidade, limite mínimo de 50ms
        gameState.foodEaten = 0;
        console.log(`Nível ${gameState.level}! Velocidade: ${gameState.speed}ms`);
    }
}

// Finaliza o jogo
export function finalizarJogo() {
    gameState.isGameOver = true;
    console.log('Game Over!');
}

// Reinicia o jogo
export function reiniciarJogo() {
    gameState.score = 0;
    gameState.level = 1;
    gameState.foodEaten = 0;
    gameState.speed = 200;
    gameState.isGameOver = false;
    console.log('Jogo reiniciado!');
}

// Atualiza a pontuação e o progresso
export function atualizarPontuacao(pontos) {
    gameState.score += pontos;
    gameState.foodEaten++;
    console.log(`Pontuação: ${gameState.score}, Comidas: ${gameState.foodEaten}/25`);
    atualizarNivel();
}

// Obtém o estado atual do jogo
export function getGameState() {
    return gameState;
}
