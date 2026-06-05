const app = require("./src/app");

const PORTA = process.env.PORT || 3000;

// Inicia o servidor na porta expecificada
app.listen(PORTA, () => {
  console.log("Servidor rodando em http://localhost:" + PORTA);
});
