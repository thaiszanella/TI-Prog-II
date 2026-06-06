const SugestaoModel = require("../models/sugestaoModel");

function listar(req, res) {
  const sugestoes = SugestaoModel.listarTodos(req.query);
  res.status(200).json({ total: sugestoes.length, sugestoes });
}

function buscar(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const sugestao = SugestaoModel.buscarPorId(id);
  if (!sugestao) {
    return res.status(404).json({ erro: "Sugestão não encontrada" });
  }

  res.status(200).json(sugestao);
}

function criar(req, res) {
  try {
    const novaSugestao = SugestaoModel.criar(req.body);
    res
      .status(201)
      .set("Location", "/api/sugestoes/" + novaSugestao.id)
      .json(novaSugestao);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

module.exports = { listar, buscar, criar };
