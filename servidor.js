const express = require("express");
const path = require("path");

const app = express();
const PORTA = 80;

// "Banco de dados" simples: lista de usuários guardada na memória do servidor
const usuarios = [];

// EJS: motor de templates para páginas dinâmicas (pasta views)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Permite ler os dados enviados pelos formulários (método POST)
app.use(express.urlencoded({ extended: true }));

function pagina(nomeDoArquivo) {
    return path.join(__dirname, "public", nomeDoArquivo);
}

// ---------- Rotas (GET) ----------

// Endereço padrão do servidor -> página de projetos
app.get("/", function (req, res) {
    res.sendFile(pagina("projects.html"));
});

// Rotas pedidas no Lab 7: <ip>/Home.html e <ip>/Project.html
app.get("/Home.html", function (req, res) {
    res.sendFile(pagina("index.html"));
});

app.get("/Project.html", function (req, res) {
    res.sendFile(pagina("projects.html"));
});

// Cadastro.html é acessado com a requisição /cadastra
app.get("/cadastra", function (req, res) {
    res.sendFile(pagina("cadastro.html"));
});

// Login.html é acessado com a requisição /login
app.get("/login", function (req, res) {
    res.sendFile(pagina("login.html"));
});

// ---------- Rotas (POST) ----------

app.post("/cadastra", function (req, res) {
    const nome = (req.body.nome || "").trim();
    const email = (req.body.email || "").trim().toLowerCase();
    const senha = req.body.senha || "";

    if (nome === "" || email === "" || senha === "") {
        return res.render("resposta", {
            titulo: "Cadastro não realizado",
            mensagem: "Preencha todos os campos para se cadastrar.",
            sucesso: false,
            nome: null,
            link: "/cadastra",
            textoLink: "Tentar de novo"
        });
    }

    const jaExiste = usuarios.find(function (u) {
        return u.email === email;
    });

    if (jaExiste) {
        return res.render("resposta", {
            titulo: "Cadastro não realizado",
            mensagem: "Já existe um usuário cadastrado com esse e-mail.",
            sucesso: false,
            nome: null,
            link: "/cadastra",
            textoLink: "Tentar de novo"
        });
    }

    usuarios.push({ nome: nome, email: email, senha: senha });

    res.render("resposta", {
        titulo: "Cadastro realizado!",
        mensagem: "Seu usuário foi cadastrado com sucesso.",
        sucesso: true,
        nome: nome,
        link: "/login",
        textoLink: "Ir para o login"
    });
});

app.post("/login", function (req, res) {
    const email = (req.body.email || "").trim().toLowerCase();
    const senha = req.body.senha || "";

    const usuario = usuarios.find(function (u) {
        return u.email === email && u.senha === senha;
    });

    if (usuario) {
        res.render("resposta", {
            titulo: "Login realizado!",
            mensagem: "Login efetuado com sucesso.",
            sucesso: true,
            nome: usuario.nome,
            link: "/",
            textoLink: "Ir para os projetos"
        });
    } else {
        res.render("resposta", {
            titulo: "Falha no login",
            mensagem: "E-mail ou senha incorretos (ou usuário não cadastrado).",
            sucesso: false,
            nome: null,
            link: "/login",
            textoLink: "Tentar de novo"
        });
    }
});

// ---------- Arquivos estáticos ----------

// Fotos do portfólio (pasta imagens, na raiz do projeto)
app.use("/imagens", express.static(path.join(__dirname, "imagens")));

// Todas as páginas, CSS e JS da pasta public (index:false para "/" ir para projects.html)
app.use(express.static(path.join(__dirname, "public"), { index: false }));

// "0.0.0.0" permite acessar o servidor de outros computadores da mesma rede
app.listen(PORTA, "0.0.0.0", function () {
    console.log("Servidor rodando na porta " + PORTA);
    console.log("Acesse: http://localhost/");
});
