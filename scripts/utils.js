// utils.js

// Verifica se duas posições no grid são iguais
export function compararPosicoes(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

// Gera uma posição aleatória dentro do grid
export function gerarPosicaoAleatoria(gridSize) {
    return {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
    };
}

// Verifica se uma posição está dentro de uma lista de segmentos
export function posicaoEstaNaLista(posicao, lista) {
    return lista.some(segment => compararPosicoes(segment, posicao));
}

// Retorna um número aleatório dentro de um intervalo (inclusive)
export function numeroAleatorioEntre(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
