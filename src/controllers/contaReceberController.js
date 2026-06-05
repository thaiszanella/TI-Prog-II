const ContaReceberModel = require("../models/contaReceberModel");

function listar(req, res) {
  const contas = ContaReceberModel.listarTodos(req.query);
  res.status(200).json({ total: contas.length, contas });
}

function buscar(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const conta = ContaReceberModel.buscarPorId(id);
  if (!conta) {
    return res.status(404).json({ erro: "Conta a receber não encontrada" });
  }

  res.status(200).json(conta);
}

function criar(req, res) {
  try {
    const novaConta = ContaReceberModel.criar(req.body);
    res
      .status(201)
      .set("Location", "/api/contas-receber/" + novaConta.id)
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
    const conta = ContaReceberModel.atualizar(id, req.body);
    if (!conta) {
      return res.status(404).json({ erro: "Conta a receber não encontrada" });
    }
    res.status(200).json(conta);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

function cancelar(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const conta = ContaReceberModel.cancelar(id);
  if (!conta) {
    return res.status(404).json({ erro: "Conta a receber não encontrada" });
  }

  res.status(200).json({ mensagem: "Conta a receber cancelada", conta });
}

function remover(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const ok = ContaReceberModel.remover(id);
  if (!ok) {
    return res.status(404).json({ erro: "Conta a receber não encontrada" });
  }
  res.status(204).send();
}

module.exports = { listar, buscar, criar, atualizar, cancelar, remover };
