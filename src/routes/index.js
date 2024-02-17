import express from "express";
import livros from "./livrosRoutes.js";
import autores from "./autorRoutes.js";

const routes = (app) => {// parametro app é a instancia do express que vai ser utilizado quando chamar a função no arquivo app.js
    app.route("/").get((req, res) => res.status(200).send("Curso de node.js"));

    app.use(express.json(), livros, autores)// adiciona um middleware para o express conseguir tartar req com formato json, pois o middleware irá analisar o corpo da requisição e torná-lo disponível no objeto req.body.
    // e toda as rotas com livros e de autores
};

export default routes;