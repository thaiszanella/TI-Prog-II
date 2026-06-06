const PacoteModel = require("../models/pacoteModel");

function listar(req, res) {
  const pacotes = PacoteModel.listarTodos();
  res.status(200).json({ total: pacotes.length, pacotes });
}

function buscar(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const pacote = PacoteModel.buscarPorId(id);
  if (!pacote) {
    return res.status(404).json({ erro: "Pacote não encontrado" });
  }

  res.status(200).json(pacote);
}

function criar(req, res) {
  try {
    const novoPacote = PacoteModel.criar(req.body);
    res
      .status(201)
      .set("Location", "/api/pacotes/" + novoPacote.id)
      .json(novoPacote);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

function atualizar(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    const pacote = PacoteModel.atualizar(id, req.body);
    if (!pacote) {
      return res.status(404).json({ erro: "Pacote não encontrado" });
    }
    res.status(200).json(pacote);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

function remover(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const ok = PacoteModel.remover(id);
  if (!ok) {
    return res.status(404).json({ erro: "Pacote não encontrado" });
  }
  res.status(204).send();
}

module.exports = { listar, buscar, criar, atualizar, remover };
