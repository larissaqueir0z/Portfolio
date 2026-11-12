const canvas = document.getElementById("area");
const ctx = canvas.getContext("2d");

const TAMANHO = 50; // largura e altura da imagem no canvas

const imagem = new Image();
imagem.src = "personagem.svg";

// Posição do ponteiro do mouse (relativa ao canvas). Começa no centro.
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

// Escutamos o mouse na página inteira, assim a imagem continua
// sendo controlada mesmo quando o mouse sai do canvas.
document.addEventListener("mousemove", function (evento) {
    const retangulo = canvas.getBoundingClientRect();
    mouseX = evento.clientX - retangulo.left - canvas.clientLeft;
    mouseY = evento.clientY - retangulo.top - canvas.clientTop;
});

// Mantém um valor entre um mínimo e um máximo
function limitar(valor, minimo, maximo) {
    return Math.min(Math.max(valor, minimo), maximo);
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // O ponteiro fica no centro da imagem (por isso subtraímos metade do tamanho)
    // e a imagem nunca desaparece do canvas (limitamos x e y).
    const x = limitar(mouseX - TAMANHO / 2, 0, canvas.width - TAMANHO);
    const y = limitar(mouseY - TAMANHO / 2, 0, canvas.height - TAMANHO);

    ctx.drawImage(imagem, x, y, TAMANHO, TAMANHO);

    requestAnimationFrame(animar);
}

// Só começa a animar depois que a imagem carregar
imagem.onload = animar;
