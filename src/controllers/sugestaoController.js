const db = require("../models");

async function listar(req, res) {
  try {
    const sugestoes = await db.Sugestao.findAll();
    res.status(200).json({ total: sugestoes.length, sugestoes });
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

    const sugestao = await db.Sugestao.findByPk(id);

    if (!sugestao) {
      return res.status(404).json({ erro: "Sugestão não encontrada" });
    }

    res.status(200).json(sugestao);
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function criar(req, res) {
  try {
    const novaSugestao = await db.Sugestao.create(req.body);
    res
      .status(201)
      .set("Location", "/api/sugestoes/" + novaSugestao.id)
      .json(novaSugestao);
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

module.exports = { listar, buscar, criar };
