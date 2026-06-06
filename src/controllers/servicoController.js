const ServicoModel = require("../models/servicoModel");

function listar(req, res) {
  const servicos = ServicoModel.listarTodos();
  res.status(200).json({ total: servicos.length, servicos });
}

function buscar(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const servico = ServicoModel.buscarPorId(id);
  if (!servico) {
    return res.status(404).json({ erro: "Serviço não encontrado" });
  }

  res.status(200).json(servico);
}

function criar(req, res) {
  try {
    const novoServico = ServicoModel.criar(req.body);
    res
      .status(201)
      .set("Location", "/api/servicos/" + novoServico.id)
      .json(novoServico);
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
    const servico = ServicoModel.atualizar(id, req.body);
    if (!servico) {
      return res.status(404).json({ erro: "Serviço não encontrado" });
    }
    res.status(200).json(servico);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

function remover(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const ok = ServicoModel.remover(id);
  if (!ok) {
    return res.status(404).json({ erro: "Serviço não encontrado" });
  }
  res.status(204).send();
}

module.exports = { listar, buscar, criar, atualizar, remover };
