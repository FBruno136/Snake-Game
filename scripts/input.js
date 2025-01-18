// Estado inicial da entrada
let direcaoAtual = { x: 1, y: 0 }; 
let direcaoProxima = { x: 1, y: 0 }; 

// Atualiza a direção com base na entrada do usuário
export function configurarEntrada() {
    document.addEventListener('keydown', (event) => {
        const direcoes = {
            ArrowUp: { x: 0, y: -1 },
            ArrowDown: { x: 0, y: 1 },
            ArrowLeft: { x: -1, y: 0 },
            ArrowRight: { x: 1, y: 0 },
            w: { x: 0, y: -1 },
            s: { x: 0, y: 1 },
            a: { x: -1, y: 0 },
            d: { x: 1, y: 0 },
            W: { x: 0, y: -1 },
            S: { x: 0, y: 1 },
            A: { x: -1, y: 0 },
            D: { x: 1, y: 0 },
        };

        if (direcoes[event.key]) {
            const novaDirecao = direcoes[event.key];

            // Evita reversão direta (movimento oposto ao atual)
            if (
                novaDirecao.x !== -direcaoAtual.x ||
                novaDirecao.y !== -direcaoAtual.y
            ) {
                direcaoProxima = novaDirecao;
            }
        }
    });
}

// Retorna a direção mais recente e atualiza o estado interno
export function obterDirecao() {
    direcaoAtual = direcaoProxima;
    return direcaoAtual;
}
