const db = require("../models");

async function listar(req, res) {
  try {
    const servicos = await db.Servico.findAll();
    res.status(200).json({ total: servicos.length, servicos });
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

    const servico = await db.Servico.findByPk(id);
    if (!servico) {
      return res.status(404).json({ erro: "Serviço não encontrado" });
    }

    res.status(200).json(servico);
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function criar(req, res) {
  try {
    const novoServico = await db.Servico.create(req.body);
    res
      .status(201)
      .set("Location", "/api/servicos/" + novoServico.id)
      .json(novoServico);
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

    const servico = await db.Servico.findByPk(id);
    if (!servico) {
      return res.status(404).json({ erro: "Serviço não encontrado" });
    }

    await servico.update(req.body);
    res.status(200).json(servico);
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

    const deletado = await db.Servico.destroy({ where: { id } });
    if (!deletado) {
      return res.status(404).json({ erro: "Serviço não encontrado" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

module.exports = { listar, buscar, criar, atualizar, remover };
