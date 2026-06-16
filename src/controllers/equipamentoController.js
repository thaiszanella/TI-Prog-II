const db = require("../models");
const { Op } = require("sequelize");

async function listar(req, res) {
  try {
    const where = {};
    if (req.query.fornecedor === "true") {
      where.fornecedor = { [Op.ne]: null };
    }
    if (req.query.fornecedor === "false") {
      where.fornecedor = null;
    }

    const equipamentos = await db.Equipamento.findAll({ where });
    res.status(200).json({ total: equipamentos.length, equipamentos });
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

    const equipamento = await db.Equipamento.findByPk(id);
    if (!equipamento) {
      return res.status(404).json({ erro: "Equipamento não encontrado" });
    }

    res.status(200).json(equipamento);
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function criar(req, res) {
  try {
    const novoEquipamento = await db.Equipamento.create(req.body);
    res
      .status(201)
      .set("Location", "/api/equipamentos/" + novoEquipamento.id)
      .json(novoEquipamento);
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

    const equipamento = await db.Equipamento.findByPk(id);
    if (!equipamento) {
      return res.status(404).json({ erro: "Equipamento não encontrado" });
    }

    await equipamento.update(req.body);
    res.status(200).json(equipamento);
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

    const deletado = await db.Equipamento.destroy({ where: { id } });
    if (!deletado) {
      return res.status(404).json({ erro: "Equipamento não encontrado" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

module.exports = { listar, buscar, criar, atualizar, remover };
