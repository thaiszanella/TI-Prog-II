const db = require("../models");

async function listar(req, res) {
  try {
    const where = {};

    if (req.query.status) {
      where.status = req.query.status;
    }

    if (req.query.clienteId) {
      where.clienteId = parseInt(req.query.clienteId);
    }

    const contas = await db.ContaReceber.findAll({ where });
    res.status(200).json({ total: contas.length, contas });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function buscar(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const conta = await db.ContaReceber.findByPk(id);
    if (!conta) {
      return res.status(404).json({ erro: "Conta a receber não encontrada" });
    }

    res.status(200).json(conta);
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function criar(req, res) {
  try {
    const novaConta = await db.ContaReceber.create(req.body);
    res
      .status(201)
      .set("Location", "/api/contas-receber/" + novaConta.id)
      .json(novaConta);
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ erro: "ID inválido" });

    const conta = await db.ContaReceber.findByPk(id);
    if (!conta)
      return res.status(404).json({ erro: "Conta a receber não encontrada" });

    await conta.update(req.body);
    res.status(200).json(conta);
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function cancelar(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const conta = await db.ContaReceber.findByPk(id);
    if (!conta) {
      return res.status(404).json({ erro: "Conta a receber não encontrada" });
    }

    await conta.update({ status: "cancelado" });
    res.status(200).json({ mensagem: "Conta a receber cancelada", conta });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function remover(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const deletado = await db.ContaReceber.destroy({ where: { id } });
    if (!deletado) {
      return res.status(404).json({ erro: "Conta a receber não encontrada" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

module.exports = { listar, buscar, criar, atualizar, cancelar, remover };
