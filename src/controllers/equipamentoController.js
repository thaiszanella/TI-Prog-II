const EquipamentoModel = require("../models/equipamentoModel");

function listar(req, res) {
  const equipamentos = EquipamentoModel.listarTodos(req.query);
  res.status(200).json({ total: equipamentos.length, equipamentos });
}

function buscar(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const equipamento = EquipamentoModel.buscarPorId(id);
  if (!equipamento)
    return res.status(404).json({ erro: "Equipamento não encontrado" });

  res.status(200).json(equipamento);
}

function criar(req, res) {
  try {
    const novoEquipamento = EquipamentoModel.criar(req.body);
    res
      .status(201)
      .set("Location", "/api/equipamentos/" + novoEquipamento.id)
      .json(novoEquipamento);
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
    const equipamento = EquipamentoModel.atualizar(id, req.body);
    if (!equipamento) {
      return res.status(404).json({ erro: "Equipamento não encontrado" });
    }
    res.status(200).json(equipamento);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

function remover(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const ok = EquipamentoModel.remover(id);
  if (!ok) {
    return res.status(404).json({ erro: "Equipamento não encontrado" });
  }
  res.status(204).send();
}

module.exports = { listar, buscar, criar, atualizar, remover };
