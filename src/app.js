const express = require("express");

const app = express();

app.use(express.json());

// Rota de teste, responde a GET/
app.get("/", (req, res) => {
  res.json({
    mensagem: "API funcionando",
    versao: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

//Deve ser o último middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    erro: err.message || "Erro interno do servidor",
  });
});

module.exports = app;
