const db = require("../models");
const { Op } = require("sequelize");

async function listar(req, res) {
  try {
    const clientes = await db.Cliente.findAll();
    res.status(200).json({ total: clientes.length, clientes });
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

    const cliente = await db.Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    res.status(200).json(cliente);
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function criar(req, res) {
  try {
    const novoCliente = await db.Cliente.create(req.body);
    res
      .status(201)
      .set("Location", "/api/clientes/" + novoCliente.id)
      .json(novoCliente);
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const cliente = await db.Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    await cliente.update(req.body);
    res.status(200).json(cliente);
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

    const deletado = await db.Cliente.destroy({ where: { id } });
    if (!deletado) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

module.exports = { listar, buscar, criar, atualizar, remover };
