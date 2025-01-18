export function limparCanvas(context, width, height) {
    context.clearRect(0, 0, width, height);
}

// Função principal para renderizar o jogo
export function renderizarJogo(context, cellSize, snakeBody, foodPosition) {
    // Limpar o canvas
    limparCanvas(context, context.canvas.width, context.canvas.height);

    // Renderizar a comida
    context.fillStyle = 'red';
    context.fillRect(
        foodPosition.x * cellSize,
        foodPosition.y * cellSize,
        cellSize,
        cellSize
    );

    // Renderizar a cobra
    context.fillStyle = 'green';
    snakeBody.forEach(segment => {
        context.fillRect(
            segment.x * cellSize,
            segment.y * cellSize,
            cellSize,
            cellSize
        );
    });
}
