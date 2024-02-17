import livro from "../models/Livro.js"; // importando o model livro criado 
import { autor } from "../models/Autor.js";

class LivroController { // uma classe com os métodos para manejar as req e res

    static async listarLivros (req, res) {
        try {
            const listaLivros = await livro.find({}); //.find é um método do mongoose para encontrar conteúdo do banco (essa linha nao tem especificação) 
            res.status(200).json(listaLivros);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha na requisição` });
        }
    };

    static async listarLivro (req, res) {
        try {
            const id = req.params.id
            const livroEncontrado = await livro.findById(id)
            res.status(200).json(livroEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha na requisição do livro` });
        }
    };

    static async cadastrarLivro (req, res) {
        const novoLivro = req.body; 

        try { // try|catch é uma tratativa de erro caso aconteça um erro ele entra na condição catch
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc}};
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message: "criado com  sucesso", livro: novoLivro });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao cadastrar livro` });
        }
    };

    static async atualizarLivro (req, res) {
        try {
            const id = req.params.id
            await livro.findByIdAndUpdate(id, req.body) // método do mongoose para atualizar o registro a partir do id
            res.status(200).json({ message: "Livro atualizado" });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha na atualização do livro` });
        }
    };

    static async excluirLivro (req, res) {
        try {
            const id = req.params.id
            await livro.findByIdAndDelete(id) // método do mongoose para deletar o registro a partir do id
            res.status(200).json({ message: "Livro excluído com sucesso" });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha na atualização do livro` });
        }
    };
    
    static async listarLivrosPorEditora (req, res) {
       const editora = req.query.editora;
       try {
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora)         
       } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha na busca` });
       }
    };


};

export default LivroController;