const db = require("../models");
const { Op } = require("sequelize");

async function resumo(req, res) {
  try {
    const [
      totalEventos, agendados, finalizados, cancelados,
      totalUsuarios, admins, funcionarios,
      totalRecebido, totalPago,
      clientesComPrograma,
    ] = await Promise.all([
      db.Evento.count(),
      db.Evento.count({ where: { status: "agendado" } }),
      db.Evento.count({ where: { status: "finalizado" } }),
      db.Evento.count({ where: { status: "cancelado" } }),
      db.Usuario.count(),
      db.Usuario.count({ where: { tipo: "administrador" } }),
      db.Usuario.count({ where: { tipo: "funcionario" } }),
      db.ContaReceber.sum("valor", { where: { status: "pago" } }),
      db.ContaPagar.sum("valor", { where: { status: "pago" } }),
      db.Fidelidade.count(),
    ]);

    res.status(200).json({
      eventos: { total: totalEventos, agendados, finalizados, cancelados },
      usuarios: { total: totalUsuarios, administradores: admins, funcionarios },
      financeiro: {
        totalRecebido: parseFloat((totalRecebido || 0).toFixed(2)),
        totalPago: parseFloat((totalPago || 0).toFixed(2)),
      },
      fidelidade: { clientesComPrograma },
    });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function financeiro(req, res) {
  try {
    const [
      recTotal, recPendente, recPago, recCancelado,
      despTotal, despPendente, despPago, despCancelado,
    ] = await Promise.all([
      db.ContaReceber.sum("valor"),
      db.ContaReceber.sum("valor", { where: { status: "pendente" } }),
      db.ContaReceber.sum("valor", { where: { status: "pago" } }),
      db.ContaReceber.sum("valor", { where: { status: "cancelado" } }),
      db.ContaPagar.sum("valor"),
      db.ContaPagar.sum("valor", { where: { status: "pendente" } }),
      db.ContaPagar.sum("valor", { where: { status: "pago" } }),
      db.ContaPagar.sum("valor", { where: { status: "cancelado" } }),
    ]);

    const fmt = (v) => parseFloat((v || 0).toFixed(2));

    res.status(200).json({
      receitas: { total: fmt(recTotal), pendente: fmt(recPendente), pago: fmt(recPago), cancelado: fmt(recCancelado) },
      despesas: { total: fmt(despTotal), pendente: fmt(despPendente), pago: fmt(despPago), cancelado: fmt(despCancelado) },
      saldo: fmt((recTotal || 0) - (despTotal || 0)),
    });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function eventos(req, res) {
  try {
    const agora = new Date();
    const limite = new Date(agora.getTime() + 24 * 60 * 60 * 1000);

    const [total, agendados, finalizados, cancelados, proximasVinteQuatroHoras] = await Promise.all([
      db.Evento.count(),
      db.Evento.count({ where: { status: "agendado" } }),
      db.Evento.count({ where: { status: "finalizado" } }),
      db.Evento.count({ where: { status: "cancelado" } }),
      db.Evento.count({ where: { status: "agendado", dataHora: { [Op.gte]: agora, [Op.lte]: limite } } }),
    ]);

    res.status(200).json({
      porStatus: { agendado: agendados, finalizado: finalizados, cancelado: cancelados },
      total,
      proximasVinteQuatroHoras,
    });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function alertas(req, res) {
  try {
    const agora = new Date();
    const limite24h = new Date(agora.getTime() + 24 * 60 * 60 * 1000);
    const limite7d = new Date(agora.getTime() + 7 * 24 * 60 * 60 * 1000);

    const [
      eventosProximos,
      contasReceberVencendo,
      contasPagarVencendo,
      contasReceberVencidas,
      contasPagarVencidas,
    ] = await Promise.all([
      db.Evento.findAll({
        where: { status: "agendado", dataHora: { [Op.gte]: agora, [Op.lte]: limite24h } },
      }),
      db.ContaReceber.count({
        where: { status: "pendente", dataVencimento: { [Op.gte]: agora, [Op.lte]: limite7d } },
      }),
      db.ContaPagar.count({
        where: { status: "pendente", dataVencimento: { [Op.gte]: agora, [Op.lte]: limite7d } },
      }),
      db.ContaReceber.count({ where: { status: "pendente", dataVencimento: { [Op.lt]: agora } } }),
      db.ContaPagar.count({ where: { status: "pendente", dataVencimento: { [Op.lt]: agora } } }),
    ]);

    res.status(200).json({
      eventosProximos: { quantidade: eventosProximos.length, eventos: eventosProximos },
      contasReceberVencendo,
      contasPagarVencendo,
      contasReceberVencidas,
      contasPagarVencidas,
    });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

module.exports = { resumo, financeiro, eventos, alertas };
