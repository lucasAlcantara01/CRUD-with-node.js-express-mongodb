import  express  from "express";
import LivroController from "../controllers/livroController.js";

const routes = express.Router(); // método do express para lidar com rotas 

routes.get("/livros", LivroController.listarLivros);
routes.get("/livros/busca", LivroController.listarLivrosPorEditora);
routes.get("/livros/:id", LivroController.listarLivro);
routes.post("/livros", LivroController.cadastrarLivro); 
routes.put("/livros/:id", LivroController.atualizarLivro); 
routes.delete("/livros/:id", LivroController.excluirLivro); 

export default routes;