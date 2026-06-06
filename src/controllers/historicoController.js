const HistoricoModel = require("../models/historicoModel");

function listar(req, res) {
  const registros = HistoricoModel.listarTodos(req.query);
  res.status(200).json({ total: registros.length, historico: registros });
}

function buscar(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const registro = HistoricoModel.buscarPorId(id);
  if (!registro) {
    return res.status(404).json({ erro: "Registro não encontrado" });
  }

  res.status(200).json(registro);
}

function registrar(req, res) {
  try {
    const novoRegistro = HistoricoModel.registrar(req.body);
    res
      .status(201)
      .set("Location", "/api/historico/" + novoRegistro.id)
      .json(novoRegistro);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

module.exports = { listar, buscar, registrar };
