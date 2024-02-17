import { autor } from "../models/Autor.js"; // importando o model autor criado entre {}

class AutorController { // uma classe com os métodos para manejar as req e res

    static async listarAutores (req, res) {
        try {
            const listaAutores = await autor.find({}); //.find é um método do mongoose para encontrar conteúdo do banco (essa linha nao tem especificação) 
            res.status(200).json(listaAutores);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha na requisição` });
        }
    };

    static async listarAutor (req, res) {
        try {
            const id = req.params.id
            const autorEncontrado = await autor.findById(id)
            res.status(200).json(autorEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha na requisição do autor` });
        }
    };

    static async cadastrarAutor (req, res) {
        try { // try|catch é uma tratativa de erro caso aconteça um erro ele entra na condição catch
            const novoAutor = await autor.create(req.body); // .create é um método mongoose para criar um registro no banco
            res.status(201).json({ message: "criado com  sucesso", autor: novoAutor })
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao cadastrar autor` });
        }
    };

    static async atualizarAutor (req, res) {
        try {
            const id = req.params.id
            await autor.findByIdAndUpdate(id, req.body) // método do mongoose para atualizar o registro a partir do id
            res.status(200).json({ message: "Autor atualizado" });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha na atualização do Autor` });
        }
    };

    static async excluirAutor (req, res) {
        try {
            const id = req.params.id
            await autor.findByIdAndDelete(id) // método do mongoose para deletar o registro a partir do id
            res.status(200).json({ message: "Autor excluído com sucesso" });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha na atualização do autor` });
        }
    };

};

export default AutorController;