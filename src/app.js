import express from "express";//Inicia o express
import conectaNaDataBase from "./config/dbConnect.js"; // importa a function de conexão do database
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladordeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

const conexao = await conectaNaDataBase(); // Instância da conexão / await pq é uma async function

conexao.on("error", (erro)=> { // método que espera  um evento ,no caso evento error
  console.error("erro de conexão", erro); // se um erro acontecer retorna o  tipo de erro
});

conexao.once("open", ()=> { // método que espera  um evento ,no caso evento open de conexão aberta
  console.log("Conexão com o banco feita com  sucesso!");
});

const app = express(); // instância do express
routes(app); 

app.use(manipulador404);

// eslint-disable-next-line no-unused-vars
app.use(manipuladorDeErros);

export default app;