import mongoose from "mongoose";
import { autorSchema } from "./Autor.js"; //importa o autor schema para usar no schema de livros

const livroSchema = new mongoose.Schema({ // Schema é um objeto de configuração que vai definir a estrutura e a propriedade de um livro 
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, require: true }, // require: true significa que é obrigatório
    editora: { type: String},
    preco: { type: Number },
    paginas: { type: Number },
    autor: autorSchema
}, {versionkey: false}); 

const livro = mongoose.model("livros", livroSchema) // refere a coleção livros e o schema dos livros
// model que fornece pra api as operações para fazer o CRUD 


export default livro;