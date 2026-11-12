const canvas = document.getElementById("area");
const ctx = canvas.getContext("2d");


function desenhar_quadrado(x, y, tamanho, cor) {
    ctx.fillStyle = cor;
    ctx.fillRect(x, y, tamanho, tamanho);
}

function desenhar_linha(x1, y1, x2, y2, cor) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = cor;
    ctx.lineWidth = 1;
    ctx.stroke();
}


function desenhar_arco(x, y, raio, anguloInicial, anguloFinal, corLinha, corPreenchimento) {
    ctx.beginPath();
    ctx.arc(x, y, raio, anguloInicial, anguloFinal);
    if (corPreenchimento) {
        ctx.fillStyle = corPreenchimento;
        ctx.fill();
    }
    ctx.strokeStyle = corLinha;
    ctx.lineWidth = 1;
    ctx.stroke();
}

function escrever(texto, x, y, fonte, cor) {
    ctx.font = fonte;
    ctx.fillStyle = cor;
    ctx.textAlign = "center";
    ctx.fillText(texto, x, y);
}



desenhar_quadrado(0, 0, 50, "#3300ff");     
desenhar_quadrado(250, 0, 50, "#ff2a1f");    
desenhar_quadrado(0, 120, 30, "#55ffff");    
desenhar_quadrado(270, 136, 30, "#55ffff");  
desenhar_quadrado(110, 150, 40, "#ff2a1f");  


desenhar_linha(50, 50, 150, 150, "blue");    
desenhar_linha(250, 50, 150, 150, "red");    
desenhar_linha(0, 150, 300, 150, "green");  

desenhar_arco(150, 150, 80, Math.PI, 2 * Math.PI, "green");
desenhar_arco(150, 150, 60, Math.PI, 2 * Math.PI, "green");
desenhar_arco(150, 150, 40, Math.PI, 2 * Math.PI, "green");


desenhar_arco(150, 112, 15, 0, 2 * Math.PI, "blue", "#55ffff");


escrever("Canvas", 150, 45, "20px Arial", "#333333");
