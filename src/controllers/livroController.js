import livro from "../models/Livro.js"; // importando o model livro criado 
import { autor } from "../models/Autor.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class LivroController { // uma classe com os métodos para manejar as req e res

  static listarLivros = async (req, res, next) => {
    try {
      const listaLivros = await livro.find({}); //.find é um método do mongoose para encontrar conteúdo do banco (essa linha nao tem especificação) 
      res.status(200).json(listaLivros);
    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);  
      if (id !== null) {
        res.status(200).json(livroEncontrado);
      } else {
        new NaoEncontrado("ID do livro não encontrado");
      }
    } catch (error) {
      next(error);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    const novoLivro = req.body; 

    try { // try|catch é uma tratativa de erro caso aconteça um erro ele entra na condição catch
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc}};
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({ message: "criado com  sucesso", livro: livroCriado });
    } catch (error) {
      next(error);
    }
  };

  static atualizarLivro = async (req, res) => {
    try {
      const id = req.params.id;

      const livrosResultado = await livro.findByIdAndUpdate(id, req.body); // método do mongoose para atualizar o registro a partir do id
      
      if (livrosResultado !== null) {
        res.status(200).json({ message: "Livro atualizado" });
      } else {
        new NaoEncontrado("ID do livro não encontrado");
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha na atualização do livro` });
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livrosResultado =  await livro.findByIdAndDelete(id); // método do mongoose para deletar o registro a partir do id
      if (livrosResultado !== null) {
        res.status(200).json({ message: "Livro excluído com sucesso" });
      } else {
        new NaoEncontrado("ID do livro não encontrado");
      }
    } catch (error) {
      next(error);
    }
  };
    
  static listarLivrosPorEditora = async (req, res, next) => {
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livro.find({ editora: editora });
      res.status(200).json(livrosPorEditora);         
    } catch (error) {
      next(error);
    }
  };


}

export default LivroController;