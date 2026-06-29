const express = require("express");

const usuarioRoutes = require("./routes/usuarioRoutes");
const eventoRoutes = require("./routes/eventoRoutes");
const equipamentoRoutes = require("./routes/equipamentoRoutes");
const servicoRoutes = require("./routes/servicoRoutes");
const pacoteRoutes = require("./routes/pacoteRoutes");
const contaReceberRoutes = require("./routes/contaReceberRoutes");
const contaPagarRoutes = require("./routes/contaPagarRoutes");
const fidelidadeRoutes = require("./routes/fidelidadeRoutes");
const historicoRoutes = require("./routes/historicoRoutes");
const sugestaoRoutes = require("./routes/sugestaoRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const clienteRoutes = require("./routes/clienteRoutes");

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

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/eventos", eventoRoutes);
app.use("/api/equipamentos", equipamentoRoutes);
app.use("/api/servicos", servicoRoutes);
app.use("/api/pacotes", pacoteRoutes);
app.use("/api/contas-receber", contaReceberRoutes);
app.use("/api/contas-pagar", contaPagarRoutes);
app.use("/api/fidelidade", fidelidadeRoutes);
app.use("/api/historico", historicoRoutes);
app.use("/api/sugestoes", sugestaoRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/clientes", clienteRoutes);

//Deve ser o último middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    erro: err.message || "Erro interno do servidor",
  });
});

module.exports = app;
