const db = require("../models");

async function listar(req, res) {
  try {
    const pacotes = await db.Pacote.findAll();
    res.status(200).json({ total: pacotes.length, pacotes });
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

    const pacote = await db.Pacote.findByPk(id);
    if (!pacote) {
      return res.status(404).json({ erro: "Pacote não encontrado" });
    }

    res.status(200).json(pacote);
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function criar(req, res) {
  try {
    const novoPacote = await db.Pacote.create(req.body);
    res
      .status(201)
      .set("Location", "/api/pacotes/" + novoPacote.id)
      .json(novoPacote);
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

    const pacote = await db.Pacote.findByPk(id);
    if (!pacote) {
      return res.status(404).json({ erro: "Pacote não encontrado" });
    }

    await pacote.update(req.body);
    res.status(200).json(pacote);
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

    const deletado = await db.Pacote.destroy({ where: { id } });
    if (!deletado) {
      return res.status(404).json({ erro: "Pacote não encontrado" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

module.exports = { listar, buscar, criar, atualizar, remover };
