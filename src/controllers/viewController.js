const db = require("../models");

function loginPage(_req, res) {
  res.render("login");
}

async function dashboardPage(_req, res) {
  const [
    totalEventos,
    agendados,
    finalizados,
    cancelados,
    totalUsuarios,
    admins,
    funcionarios,
    totalRecebido,
    totalPago,
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

  res.render("dashboard", {
    dados: {
      eventos: { total: totalEventos, agendados, finalizados, cancelados },
      usuarios: { total: totalUsuarios, administradores: admins, funcionarios },
      financeiro: {
        totalRecebido: parseFloat(totalRecebido || 0),
        totalPago: parseFloat(totalPago || 0),
      },
      fidelidade: { clientesComPrograma },
    },
  });
}

async function clientesPage(_req, res) {
  const clientes = await db.Cliente.findAll({ order: [["nome", "ASC"]] });
  res.render("clientes", { clientes });
}

async function eventosPage(_req, res) {
  const eventos = await db.Evento.findAll({ order: [["dataHora", "DESC"]] });
  res.render("eventos", { eventos });
}

async function servicosPage(_req, res) {
  const servicos = await db.Servico.findAll({ order: [["nome", "ASC"]] });
  res.render("servicos", { servicos });
}

async function pacotesPage(_req, res) {
  const pacotes = await db.Pacote.findAll({ order: [["nome", "ASC"]] });
  res.render("pacotes", { pacotes });
}

async function financeiroPage(_req, res) {
  const [contasReceber, contasPagar] = await Promise.all([
    db.ContaReceber.findAll({ order: [["dataVencimento", "ASC"]] }),
    db.ContaPagar.findAll({ order: [["dataVencimento", "ASC"]] }),
  ]);
  res.render("financeiro", { contasReceber, contasPagar });
}

async function equipamentosPage(_req, res) {
  const equipamentos = await db.Equipamento.findAll({
    order: [["nome", "ASC"]],
  });
  res.render("equipamentos", { equipamentos });
}

async function usuariosPage(_req, res) {
  const usuarios = await db.Usuario.findAll({
    attributes: { exclude: ["senha"] },
    order: [["nome", "ASC"]],
  });
  res.render("usuarios", { usuarios });
}

async function fidelidadePage(_req, res) {
  const fidelidade = await db.Fidelidade.findAll({
    order: [["pontos", "DESC"]],
  });
  res.render("fidelidade", { fidelidade });
}

async function historicoPage(_req, res) {
  const historico = await db.Historico.findAll({
    order: [["dataHora", "DESC"]],
  });
  res.render("historico", { historico });
}

async function sugestoesPage(_req, res) {
  const sugestoes = await db.Sugestao.findAll({
    order: [["dataCriacao", "DESC"]],
  });
  res.render("sugestoes", { sugestoes });
}

module.exports = {
  loginPage,
  dashboardPage,
  clientesPage,
  eventosPage,
  servicosPage,
  pacotesPage,
  financeiroPage,
  equipamentosPage,
  usuariosPage,
  fidelidadePage,
  historicoPage,
  sugestoesPage,
};
