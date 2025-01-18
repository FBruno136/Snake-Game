import { getSnakeState } from './snake.js';

const gameState = {
    score: 0,
    level: 1,
    foodEaten: 0,
    speed: 200,
    isGameOver: false
};

export function atualizarPontuacao(pontos) {
    gameState.score += pontos;
    gameState.foodEaten++;
    if (gameState.foodEaten % 25 === 0) {
        gameState.level++;
        gameState.speed = Math.max(50, gameState.speed - 25); 
    }
}

export function finalizarJogo() {
  gameState.isGameOver = true;
}

export function reiniciarJogo() {
  gameState.score = 0;
  gameState.level = 1;
  gameState.foodEaten = 0;
  gameState.speed = 200;
  gameState.isGameOver = false;

  // Reinicia a cobra para a posição inicial
  const snakeState = getSnakeState();  
  snakeState.body = [{ x: 10, y: 10 }];
  snakeState.direction = { x: 1, y: 0 };
  snakeState.grow = 0;

  console.log("Jogo reiniciado!");
}

export function getGameState() {
    return gameState;
}