const canvas = document.getElementById("area");
const ctx = canvas.getContext("2d");

const TAMANHO = 50; 
const imagem = new Image();
imagem.src = "personagem.svg";


let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;



document.addEventListener("mousemove", function (evento) {
    const retangulo = canvas.getBoundingClientRect();
    mouseX = evento.clientX - retangulo.left - canvas.clientLeft;
    mouseY = evento.clientY - retangulo.top - canvas.clientTop;
});


function limitar(valor, minimo, maximo) {
    return Math.min(Math.max(valor, minimo), maximo);
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

   
    
    const x = limitar(mouseX - TAMANHO / 2, 0, canvas.width - TAMANHO);
    const y = limitar(mouseY - TAMANHO / 2, 0, canvas.height - TAMANHO);

    ctx.drawImage(imagem, x, y, TAMANHO, TAMANHO);

    requestAnimationFrame(animar);
}

imagem.onload = animar;
