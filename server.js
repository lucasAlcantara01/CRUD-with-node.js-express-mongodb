import "dotenv/config"; // inicia o dontenv no ponto mais externo da aplicação
import app from "./src/app.js"; // importando a instancia do express

const PORT = 3000;

app.listen(PORT, () => { // iniciando servidor
    console.log(`Servidor iniciado! na porta: ${PORT}`);
})

