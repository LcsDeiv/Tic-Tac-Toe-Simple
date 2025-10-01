let jogadorAtual = "X";
let tabuleiro = Array(9).fill("");  // "Let e Var" serve para declarar variaveis.
let placar = { X: 0, O: 0, Empates: 0 };

const jogadorSpan = document.getElementById("jogador-atual"); // "document.getElementByid" serve para  selecionar um ID do elemento HTML. (Importação)
const placarX = document.getElementById("placar-x");
const placarO = document.getElementById("placar-o");
const placarEmpates = document.getElementById("placar-empates");  // "const" também serve para declarar uma variavel porém não pode ser  reatribuido.
const celulas = document.querySelectorAll(".celula"); //"document.querySelectorAll" ele é mais flexivels, ele retorna todos elememento que combina com CSS
const resetarBtn = document.getElementById("resetar");

const somClique = document.getElementById("som-clique");
const somVitoria = document.getElementById("som-vitoria");
const somEmpate = document.getElementById("som-empate");

function atualizarPlacar() {    // "Fuction" significa função é um bloco de codigo reutilizavel, ou seja ele é a palavra chave para criar uma função
    placarX.innerText = placar.X;
    placarO.innerText = placar.O;  //"innerText" ele altera somente o texto visivel (ingnora tags HTML).
    placarEmpates.innerText = placar.Empates;
}

function verificarVencedor() {
    const combinacoes = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for (let combo of combinacoes) {
        if (tabuleiro[combo[0]] && tabuleiro[combo[0]] === tabuleiro[combo[1]] && tabuleiro[combo[1]] === tabuleiro[combo[2]]) {
            combo.forEach(index => celulas[index].classList.add("vencedora"));
            return true;
        }
    }
    return false;
}

function jogar(index) {
    if (tabuleiro[index] === "" && !verificarVencedor()) {
        tabuleiro[index] = jogadorAtual;
        celulas[index].innerText = jogadorAtual;
        somClique.play();

        if (verificarVencedor()) {
            placar[jogadorAtual]++;
            atualizarPlacar();
            somVitoria.play();
            setTimeout(() => alert(`🎉 Jogador ${jogadorAtual} venceu!`), 100);
            setTimeout(reiniciarTabuleiro, 1200);
        } else if (!tabuleiro.includes("")) {
            placar.Empates++;
            atualizarPlacar();
            somEmpate.play();
            setTimeout(() => alert("🤝 Empate!"), 100);  //"setTimeout" serve para executar um codigo depois de um tempo determinado (milissegundos)
            setTimeout(reiniciarTabuleiro, 1200);
        } else {
            jogadorAtual = jogadorAtual === "X" ? "O" : "X";
            jogadorSpan.innerText = jogadorAtual;
        }
    }
}

function reiniciarTabuleiro() {
    tabuleiro = Array(9).fill("");// "Array(n).fill" é uma lista de valores armazenados em uma unica variável
    celulas.forEach(celula => {  // "forEach" é um metodo usado para pecorrer todos itens de um array e executar a função para cada item
        celula.innerText = "";
        celula.classList.remove("vencedora");
    });
    jogadorAtual = "X";
    jogadorSpan.innerText = jogadorAtual;
}

celulas.forEach(celula => {
    celula.addEventListener("click", () => jogar(celula.dataset.index));
});

resetarBtn.addEventListener("click", () => { //"addEventListener" dar interação no HTML em determinadas ações do usuario.
    placar = { X: 0, O: 0, Empates: 0 };
    atualizarPlacar();
    reiniciarTabuleiro();
});

atualizarPlacar();