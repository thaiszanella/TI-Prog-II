const EventoModel = require("../models/eventoModel");
const UsuarioModel = require("../models/usuarioModel");
const ContaReceberModel = require("../models/contaReceberModel");
const ContaPagarModel = require("../models/contaPagarModel");
const FidelidadeModel = require("../models/fidelidadeModel");

function resumo(req, res) {
  const eventos = EventoModel.listarTodos();
  const usuarios = UsuarioModel.listarTodos();
  const contasReceber = ContaReceberModel.listarTodos();
  const contasPagar = ContaPagarModel.listarTodos();
  const fidelidade = FidelidadeModel.listarTodos();

  const totalRecebido = contasReceber
    .filter((c) => c.status === "pago")
    .reduce((acc, c) => acc + c.valor, 0);

  const totalPago = contasPagar
    .filter((c) => c.status === "pago")
    .reduce((acc, c) => acc + c.valor, 0);

  res.status(200).json({
    eventos: {
      total: eventos.length,
      agendados: eventos.filter((e) => e.status === "agendado").length,
      finalizados: eventos.filter((e) => e.status === "finalizado").length,
      cancelados: eventos.filter((e) => e.status === "cancelado").length,
    },
    usuarios: {
      total: usuarios.length,
      administradores: usuarios.filter((u) => u.tipo === "administrador")
        .length,
      funcionarios: usuarios.filter((u) => u.tipo === "funcionario").length,
    },
    financeiro: {
      totalRecebido: parseFloat(totalRecebido.toFixed(2)),
      totalPago: parseFloat(totalPago.toFixed(2)),
    },
    fidelidade: {
      clientesComPrograma: fidelidade.length,
    },
  });
}

function financeiro(req, res) {
  const contasReceber = ContaReceberModel.listarTodos();
  const contasPagar = ContaPagarModel.listarTodos();

  const despesasTotais = contasPagar.reduce((s, c) => s + c.valor, 0);

  const despesasPendentes = contasPagar
    .filter((c) => c.status === "pendente")
    .reduce((s, c) => s + c.valor, 0);

  const despesasPagas = contasPagar
    .filter((c) => c.status === "pago")
    .reduce((s, c) => s + c.valor, 0);

  const despesasCanceladas = contasPagar
    .filter((c) => c.status === "cancelado")
    .reduce((s, c) => s + c.valor, 0);

  const receitasTotais = contasReceber.reduce((s, c) => s + c.valor, 0);

  const receitasPendentes = contasReceber
    .filter((c) => c.status === "pendente")
    .reduce((s, c) => s + c.valor, 0);

  const receitasPagas = contasReceber
    .filter((c) => c.status === "pago")
    .reduce((s, c) => s + c.valor, 0);

  const receitasCanceladas = contasReceber
    .filter((c) => c.status === "cancelado")
    .reduce((s, c) => s + c.valor, 0);

  res.status(200).json({
    receitas: {
      total: parseFloat(receitasTotais.toFixed(2)),
      pendente: parseFloat(receitasPendentes.toFixed(2)),
      pago: parseFloat(receitasPagas.toFixed(2)),
      cancelado: parseFloat(receitasCanceladas.toFixed(2)),
    },
    despesas: {
      total: parseFloat(despesasTotais.toFixed(2)),
      pendente: parseFloat(despesasPendentes.toFixed(2)),
      pago: parseFloat(despesasPagas.toFixed(2)),
      cancelado: parseFloat(despesasCanceladas.toFixed(2)),
    },
    saldo: parseFloat((receitasTotais - despesasTotais).toFixed(2)),
  });
}

function eventos(req, res) {
  const todosEventos = EventoModel.listarTodos();
  const proximos = EventoModel.buscarProximos();

  eventosAgendados = todosEventos.filter((e) => e.status === "agendado").length;

  eventosFinalizados = todosEventos.filter(
    (e) => e.status === "finalizado",
  ).length;

  eventosCancelados = todosEventos.filter(
    (e) => e.status === "cancelado",
  ).length;

  res.status(200).json({
    porStatus: {
      agendado: eventosAgendados,
      finalizado: eventosFinalizados,
      cancelado: eventosCancelados,
    },
    total: todosEventos.length,
    proximasVinteQuatroHoras: proximos.length,
  });
}

function alertas(req, res) {
  const agora = new Date();
  const sete_dias = new Date(agora.getTime() + 7 * 24 * 60 * 60 * 1000);

  const eventosProximos = EventoModel.buscarProximos();

  const contasReceberVencendo = ContaReceberModel.listarTodos({
    status: "pendente",
  }).filter((c) => {
    const venc = new Date(c.dataVencimento);
    return venc >= agora && venc <= sete_dias;
  });

  const contasPagarVencendo = ContaPagarModel.listarTodos({
    status: "pendente",
  }).filter((c) => {
    const venc = new Date(c.dataVencimento);
    return venc >= agora && venc <= sete_dias;
  });

  const contasReceberVencidas = ContaReceberModel.listarTodos({
    status: "pendente",
  }).filter((c) => new Date(c.dataVencimento) < agora);

  const contasPagarVencidas = ContaPagarModel.listarTodos({
    status: "pendente",
  }).filter((c) => new Date(c.dataVencimento) < agora);

  res.status(200).json({
    eventosProximos: {
      quantidade: eventosProximos.length,
      eventos: eventosProximos,
    },
    contasReceberVencendo: contasReceberVencendo.length,
    contasPagarVencendo: contasPagarVencendo.length,
    contasReceberVencidas: contasReceberVencidas.length,
    contasPagarVencidas: contasPagarVencidas.length,
  });
}

module.exports = { resumo, financeiro, eventos, alertas };
