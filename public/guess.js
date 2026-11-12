
let numeroSecreto = Math.floor(Math.random() * 100);
let tentativas = 0;

function verificar() {
    const campo = document.getElementById("palpite");
    const mensagem = document.getElementById("mensagem");

    if (campo.value === "") {
        mensagem.textContent = "Digite um número antes de chutar!";
        return;
    }

    const palpite = Number(campo.value);

    if (!Number.isInteger(palpite) || palpite < 0 || palpite > 99) {
        mensagem.textContent = "Digite um número inteiro entre 0 e 99.";
        return;
    }

    tentativas = tentativas + 1;
    document.getElementById("tentativas").textContent = "Tentativas: " + tentativas;

    if (palpite > numeroSecreto) {
        mensagem.textContent = "Errou! O número secreto é MENOR que " + palpite + ".";
        pintar("red");
    } else if (palpite < numeroSecreto) {
        mensagem.textContent = "Errou! O número secreto é MAIOR que " + palpite + ".";
        pintar("red");
    } else {
        mensagem.textContent = "Acertou! O número era " + numeroSecreto + " e você levou " + tentativas + " tentativa(s).";
        pintar("green");
    }

    campo.select();
}


function pintar(cor) {
    const caixa = document.getElementById("caixa");
    caixa.style.setProperty("background-color", cor);
    caixa.style.setProperty("color", "white");
}

function reiniciar() {
    numeroSecreto = Math.floor(Math.random() * 100);
    tentativas = 0;

    const caixa = document.getElementById("caixa");
    caixa.style.setProperty("background-color", "#ffffff");
    caixa.style.setProperty("color", "#111111");

    document.getElementById("mensagem").textContent = "";
    document.getElementById("tentativas").textContent = "Tentativas: 0";
    document.getElementById("palpite").value = "";
    document.getElementById("palpite").focus();
}


document.getElementById("palpite").addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        verificar();
    }
});
