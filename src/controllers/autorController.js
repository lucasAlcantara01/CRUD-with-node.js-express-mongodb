import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autor } from "../models/Autor.js"; // importando o model autor criado entre {}

class AutorController { // uma classe com os métodos para manejar as req e res

  static listarAutores = async (req, res) => {
    try {
      const listaAutores = await autor.find({}); //.find é um método do mongoose para encontrar conteúdo do banco (essa linha nao tem especificação) 
      res.status(200).json(listaAutores);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha na requisição` });
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado !== null) {
        res.status(200).json(autorEncontrado); 
      } else {
        next(new NaoEncontrado("Id do autor não localizado."));
      }
    } catch (error) {
      next(error);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try { // try|catch é uma tratativa de erro caso aconteça um erro ele entra na condição catch
      const novoAutor = await autor.create(req.body); // .create é um método mongoose para criar um registro no banco
     
      res.status(201).json({ message: "criado com  sucesso", autor: novoAutor });
    } catch (error) {
      next(error);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      
      const autorResultado = await autor.findByIdAndUpdate(id, req.body); // método do mongoose para atualizar o registro a partir do id
      
      if (autorResultado !== null) {
        res.status(200).json({ message: "Autor atualizado" });
      } else {
        next(new NaoEncontrado("Id do autor não localizado."));
      }
    } catch (error) {
      next(error);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorResultado = await autor.findByIdAndDelete(id); // método do mongoose para deletar o registro a partir do id
      if (autorResultado !== null) {
        res.status(200).json({ message: "Autor excluído com sucesso" });
      } else {
        next(new NaoEncontrado("ID do autor não localizado"));
      }
    } catch (error) {
      next(error);
    }
  };
}

export default AutorController;