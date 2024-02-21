import requisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends requisicaoIncorreta {
  constructor(error) {
    const mensagemErro = Object.values(error.errors)
      .map(error => error.message)
      .join("; ");
    
    super(`os seguintes erros foram encontrados: ${mensagemErro}`);
  }
}

export default ErroValidacao;