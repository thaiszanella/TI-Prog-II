require("dotenv").config();
const app = require("./src/app");
const db = require("./src/models");

const PORTA = process.env.PORT || 3000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Banco de dados conectado");
    return app.listen(PORTA, () => {
      console.log("Servidor rodando em http://localhost:" + PORTA);
    });
  })
  .catch((err) => {
    console.error("Falha ao conectar ao banco", err);
    process.exit(1);
  });
