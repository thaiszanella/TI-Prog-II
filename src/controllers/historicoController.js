const db = require("../models");

async function listar(req, res) {
  try {
    const where = {};

    if (req.query.clienteId) {
      where.clienteId = parseInt(req.query.clienteId);
    }

    if (req.query.funcionarioId) {
      where.funcionarioId = parseInt(req.query.funcionarioId);
    }

    if (req.query.eventoId) {
      where.eventoId = parseInt(req.query.eventoId);
    }

    const registros = await db.Historico.findAll({ where });
    res.status(200).json({ total: registros.length, historico: registros });
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

    const registro = await db.Historico.findByPk(id);
    if (!registro) {
      return res.status(404).json({ erro: "Registro não encontrado" });
    }

    res.status(200).json(registro);
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function registrar(req, res) {
  try {
    const { eventoId, clienteId, funcionarioId, tipoServico, valorTotal } =
      req.body;

    if (
      !eventoId ||
      !clienteId ||
      !funcionarioId ||
      !tipoServico ||
      !valorTotal
    ) {
      return res.status(400).json({
        erro: "Campos obrigatórios: eventoId, clienteId, funcionarioId, tipoServico, valorTotal",
      });
    }

    const percentualEmpresa =
      req.body.percentualEmpresa !== undefined
        ? req.body.percentualEmpresa
        : 50;
    const percentualFuncionario = 100 - percentualEmpresa;

    const novoRegistro = await db.Historico.create({
      eventoId,
      clienteId,
      funcionarioId,
      dataHora: new Date(),
      tipoServico,
      valorTotal,
      percentualEmpresa,
      percentualFuncionario,
      valorEmpresa: (valorTotal * percentualEmpresa) / 100,
      valorFuncionario: (valorTotal * percentualFuncionario) / 100,
    });

    res
      .status(201)
      .set("Location", "/api/historico/" + novoRegistro.id)
      .json(novoRegistro);
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

module.exports = { listar, buscar, registrar };
