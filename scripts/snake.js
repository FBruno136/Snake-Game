import { compararPosicoes } from './utils.js';

// Estado inicial da cobra
const snakeState = {
    body: [{ x: 10, y: 10 }], // Corpo da cobra como array de segmentos (x, y)
    direction: { x: 1, y: 0 }, // Direção inicial (1,0) => direita
    grow: 0 // Quantidade de segmentos que a cobra precisa crescer
};

export function detectarColisaoComComida(snakeHead, foodPosition) {
    return compararPosicoes(snakeHead, foodPosition);
}

// Define o tamanho do grid (tabuleiro)
const GRID_SIZE = 20;

// Atualiza a direção da cobra
export function mudarDirecao(novaDirecao) {
    // Evitar que a cobra faça um movimento inverso direto
    const { x: dx, y: dy } = snakeState.direction;
    if (
        (novaDirecao.x === -dx && novaDirecao.y === -dy) || 
        (novaDirecao.x === 0 && novaDirecao.y === 0)
    ) {
        return; // Direção inválida
    }
    snakeState.direction = novaDirecao;
}

// Move a cobra no tabuleiro
export function moverCobra() {
    const head = snakeState.body[0]; // Cabeça da cobra
    const newHead = { 
        x: head.x + snakeState.direction.x, 
        y: head.y + snakeState.direction.y 
    };

    // Adiciona a nova cabeça ao início do corpo
    snakeState.body.unshift(newHead);

    // Crescer apenas se necessário
    if (snakeState.grow > 0) {
        snakeState.grow--;
    } else {
        snakeState.body.pop(); // Remove o último segmento se não está crescendo
    }
}

// Detecta colisão da cobra com ela mesma ou com as bordas
export function detectarColisao() {
    const head = snakeState.body[0];

    // Colisão com bordas
    if (
        head.x < 0 || 
        head.x >= GRID_SIZE || 
        head.y < 0 || 
        head.y >= GRID_SIZE
    ) {
        return true; // Colisão com o limite do tabuleiro
    }

    // Colisão com o próprio corpo
    for (let i = 1; i < snakeState.body.length; i++) {
        if (head.x === snakeState.body[i].x && head.y === snakeState.body[i].y) {
            return true;
        }
    }

    return false;
}

// Verifica se a cobra comeu a comida
export function comerComida(foodPosition) {
    const head = snakeState.body[0];
    if (head.x === foodPosition.x && head.y === foodPosition.y) {
        snakeState.grow++;
        return true; // Comida consumida
    }
    return false;
}

// Renderiza a cobra no tabuleiro
export function desenharCobra(context, cellSize) {
    context.fillStyle = 'green';
    snakeState.body.forEach(segment => {
        context.fillRect(
            segment.x * cellSize, 
            segment.y * cellSize, 
            cellSize, 
            cellSize
        );
    });
}

// Obtém o estado atual da cobra
export function getSnakeState() {
    return snakeState;
}
