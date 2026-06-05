const ContaPagarModel = require("../models/contaPagarModel");

function listar(req, res) {
  const contas = ContaPagarModel.listarTodos(req.query);
  res.status(200).json({ total: contas.length, contas });
}

function buscar(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID deve ser um número inteiro" });
  }

  const conta = ContaPagarModel.buscarPorId(id);
  if (!conta) {
    return res.status(404).json({ erro: "Conta a pagar não encontrada" });
  }

  res.status(200).json(conta);
}

function criar(req, res) {
  try {
    const novaConta = ContaPagarModel.criar(req.body);
    res
      .status(201)
      .set("Location", "/api/contas-pagar/" + novaConta.id)
      .json(novaConta);
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
    const conta = ContaPagarModel.atualizar(id, req.body);
    if (!conta) {
      return res.status(404).json({ erro: "Conta a pagar não encontrada" });
    }
    res.status(200).json(conta);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

function remover(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const ok = ContaPagarModel.remover(id);
  if (!ok) {
    return res.status(404).json({ erro: "Conta a pagar não encontrada" });
  }
  res.status(204).send();
}

module.exports = { listar, buscar, criar, atualizar, remover };
