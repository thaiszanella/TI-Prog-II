const db = require("../models");
const { Op } = require("sequelize");

async function listar(req, res) {
  try {
    const where = {};

    if (req.query.status) {
      where.status = req.query.status;
    }

    if (req.query.clienteId) {
      where.clienteId = parseInt(req.query.clienteId);
    }

    if (req.query.funcionarioId) {
      where.funcionarios = {
        [Op.contains]: [parseInt(req.query.funcionarioId)],
      };
    }

    const eventos = await db.Evento.findAll({ where });
    res.status(200).json({ total: eventos.length, eventos });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function buscar(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID deve ser um número inteiro" });
    }

    const evento = await db.Evento.findByPk(id);
    if (!evento) {
      return res.status(404).json({ erro: "Evento não encontrado" });
    }

    res.status(200).json(evento);
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function criar(req, res) {
  try {
    const novoEvento = await db.Evento.create(req.body);
    res
      .status(201)
      .set("Location", "/api/eventos/" + novoEvento.id)
      .json(novoEvento);
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

    const evento = await db.Evento.findByPk(id);
    if (!evento) {
      return res.status(404).json({ erro: "Evento não encontrado" });
    }

    if (evento.status === "cancelado") {
      return res
        .status(400)
        .json({ erro: "Não é possível editar um evento cancelado" });
    }

    await evento.update(req.body);
    res.status(200).json(evento);
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

    const evento = await db.Evento.findByPk(id);
    if (!evento) {
      return res.status(404).json({ erro: "Evento não encontrado" });
    }

    await evento.update({ status: "cancelado" });
    res.status(200).json({ mensagem: "Evento cancelado com sucesso", evento });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function finalizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const evento = await db.Evento.findByPk(id);
    if (!evento) {
      return res.status(404).json({ erro: "Evento não encontrado" });
    }

    await evento.update({ status: "finalizado" });
    res.status(200).json({ mensagem: "Evento finalizado com sucesso", evento });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function proximos(req, res) {
  try {
    const agora = new Date();
    const limite = new Date(agora.getTime() + 24 * 60 * 60 * 1000);

    const eventos = await db.Evento.findAll({
      where: {
        status: "agendado",
        dataHora: { [Op.gte]: agora, [Op.lte]: limite },
      },
    });
    res.status(200).json({ eventos });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function equipamentosAlocados(req, res) {
  try {
    const eventos = await db.Evento.findAll({
      where: { status: { [Op.ne]: "cancelado" } },
      attributes: ["id", "dataHora", "status", "equipamentos"],
    });

    const alocacoes = [];
    for (const e of eventos) {
      for (const { equipamentoId, quantidade } of e.equipamentos || []) {
        alocacoes.push({
          eventoId: e.id,
          dataHora: e.dataHora,
          status: e.status,
          equipamentoId,
          quantidade,
        });
      }
    }

    res.status(200).json({ alocacoes });
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

    const deletado = await db.Evento.destroy({ where: { id } });
    if (!deletado) {
      return res.status(404).json({ erro: "Evento não encontrado" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

module.exports = {
  listar,
  buscar,
  criar,
  atualizar,
  cancelar,
  finalizar,
  proximos,
  equipamentosAlocados,
  remover,
};
