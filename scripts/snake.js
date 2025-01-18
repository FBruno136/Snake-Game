import { compararPosicoes } from './utils.js';

const GRID_SIZE = 20;

const snakeState = {
    body: [{ x: 10, y: 10 }],
    direction: { x: 1, y: 0 },
    grow: 0,

    comerComida(foodPosition) {
        const head = this.body[0];
        if (compararPosicoes(head, foodPosition)) {
            this.grow++;
            return true;
        }
        return false;
    }
};

export function mudarDirecao(novaDirecao) {
    const { x: dx, y: dy } = snakeState.direction;
    if ((novaDirecao.x === -dx && novaDirecao.y === -dy) || (novaDirecao.x === 0 && novaDirecao.y === 0)) {
        return;
    }
    snakeState.direction = novaDirecao;
}

export function moverCobra() {
    const head = snakeState.body[0];
    const newHead = {
        x: (head.x + snakeState.direction.x + GRID_SIZE) % GRID_SIZE,  // Faz a cobra atravessar as bordas
        y: (head.y + snakeState.direction.y + GRID_SIZE) % GRID_SIZE
    };

    snakeState.body.unshift(newHead);

    if (snakeState.grow > 0) {
        snakeState.grow--;
    } else {
        snakeState.body.pop();
    }
}

export function detectarColisao() {
    const head = snakeState.body[0];

    for (let i = 1; i < snakeState.body.length; i++) {
        if (compararPosicoes(head, snakeState.body[i])) {
            return true;
        }
    }

    return false;
}


export function desenharCobra(context, cellSize) {
    context.fillStyle = 'green';
    snakeState.body.forEach(segment => {
        context.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
    });
}

export function getSnakeState() {
    return snakeState;
}