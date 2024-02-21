import mongoose from "mongoose"; // importa a biblioteca mongoose

async function conectaNaDataBase() {
  mongoose.connect(process.env.DB_CONNECTION_STRING); //utilizando variável de ambiente para string de conexão do mongodb
  return mongoose.connection; // retorna um objeto com todas a informações que api precisa pra se conectar com banco
}

export default conectaNaDataBase; // exporta a function
