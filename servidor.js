const express = require("express");
const path = require("path");

const app = express();
const PORTA = 80;

const usuarios = [];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

function pagina(nomeDoArquivo) {
    return path.join(__dirname, "public", nomeDoArquivo);
}

app.get("/", function (req, res) {
    res.sendFile(pagina("projects.html"));
});

app.get("/Home.html", function (req, res) {
    res.sendFile(pagina("index.html"));
});

app.get("/Project.html", function (req, res) {
    res.sendFile(pagina("projects.html"));
});

app.get("/cadastra", function (req, res) {
    res.sendFile(pagina("cadastro.html"));
});

app.get("/login", function (req, res) {
    res.sendFile(pagina("login.html"));
});


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


app.use("/imagens", express.static(path.join(__dirname, "imagens")));

app.use(express.static(path.join(__dirname, "public"), { index: false }));

app.listen(PORTA, "0.0.0.0", function () {
    console.log("Servidor rodando na porta " + PORTA);
    console.log("Acesse: http://localhost/");
});
