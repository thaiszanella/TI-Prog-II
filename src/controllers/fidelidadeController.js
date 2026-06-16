const db = require("../models");

async function listar(req, res) {
  try {
    const registros = await db.Fidelidade.findAll();
    res.status(200).json({ total: registros.length, registros });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function buscarPorCliente(req, res) {
  try {
    const clienteId = parseInt(req.params.clienteId);
    if (isNaN(clienteId)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const registro = await db.Fidelidade.findOne({ where: { clienteId } });
    if (!registro) {
      return res
        .status(404)
        .json({ erro: "Nenhum registro de fidelidade para este cliente" });
    }

    res.status(200).json(registro);
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function adicionarPontos(req, res) {
  try {
    const { clienteId, eventoId, avaliacao } = req.body;

    if (!clienteId || !eventoId || avaliacao === undefined) {
      return res.status(400).json({
        erro: "Campos obrigatórios: clienteId, eventoId, avaliacao (1-5)",
      });
    }

    const aval = Number(avaliacao);
    if (aval < 1 || aval > 5) {
      return res.status(400).json({ erro: "Avaliação deve ser entre 1 e 5" });
    }

    const [registro] = await db.Fidelidade.findOrCreate({
      where: { clienteId },
      defaults: { pontos: 0, historico: [] },
    });

    const historicoAtual = registro.historico || [];
    const numAtendimentos =
      historicoAtual.filter((h) => h.tipo === "ganho").length + 1;
    const pontosGanhos = numAtendimentos * aval;

    const novoHistorico = [
      ...historicoAtual,
      {
        tipo: "ganho",
        pontos: pontosGanhos,
        data: new Date(),
        eventoId,
        avaliacao: aval,
      },
    ];

    await registro.update({
      pontos: registro.pontos + pontosGanhos,
      historico: novoHistorico,
    });

    res
      .status(200)
      .json({ mensagem: "Pontos adicionados com sucesso", registro });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function resgatarPontos(req, res) {
  try {
    const { clienteId, pontos } = req.body;

    if (!clienteId || pontos === undefined) {
      return res
        .status(400)
        .json({ erro: "Campos obrigatórios: clienteId, pontos" });
    }

    const pontosUsados = Number(pontos);
    if (pontosUsados <= 0) {
      return res
        .status(400)
        .json({ erro: "Quantidade de pontos para resgate deve ser positiva" });
    }

    const registro = await db.Fidelidade.findOne({ where: { clienteId } });
    if (!registro || registro.pontos < pontosUsados) {
      return res
        .status(400)
        .json({ erro: "Pontos insuficientes para resgate" });
    }

    const novoHistorico = [
      ...(registro.historico || []),
      { tipo: "resgate", pontos: -pontosUsados, data: new Date() },
    ];

    await registro.update({
      pontos: registro.pontos - pontosUsados,
      historico: novoHistorico,
    });

    const desconto = pontosUsados * 0.1;
    res.status(200).json({
      mensagem: "Pontos resgatados com sucesso",
      desconto,
      saldoRestante: registro.pontos,
    });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

module.exports = { listar, buscarPorCliente, adicionarPontos, resgatarPontos };
