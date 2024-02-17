import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({ // Schema é um objeto de configuração que vai definir a estrutura e a propriedade de um livro 
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, require: true }, // require: true significa que é obrigatório
    nacionalidade: { type: String }
}, {versionkey: false}); 

const autor = mongoose.model("autores", autorSchema) 

export {autor, autorSchema};