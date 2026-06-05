const EventoModel = require("../models/eventoModel");

function listar(req, res) {
  const eventos = EventoModel.listarTodos(req.query);
  res.status(200).json({ total: eventos.length, eventos });
}

function buscar(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID deve ser um número inteiro" });
  }

  const evento = EventoModel.buscarPorId(id);
  if (!evento) {
    return res.status(404).json({ erro: "Evento não encontrado" });
  }

  res.status(200).json(evento);
}

function criar(req, res) {
  try {
    const novoEvento = EventoModel.criar(req.body);
    res
      .status(201)
      .set("Location", "/api/eventos/" + novoEvento.id)
      .json(novoEvento);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

function atualizar(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    const evento = EventoModel.atualizar(id, req.body);
    if (!evento) {
      return res.status(404).json({ erro: "Evento não encontrado" });
    }
    res.status(200).json(evento);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

function cancelar(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const evento = EventoModel.cancelar(id);
  if (!evento) {
    return res.status(404).json({ erro: "Evento não encontrado" });
  }

  res.status(200).json({ mensagem: "Evento cancelado com sucesso", evento });
}

function finalizar(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const evento = EventoModel.finalizar(id);
  if (!evento) {
    return res.status(404).json({ erro: "Evento não encontrado" });
  }
  res.status(200).json({ mensagem: "Evento finalizado com sucesso", evento });
}

function proximos(req, res) {
  const eventosProximos = EventoModel.buscarProximos();
  res.status(200).json({ eventos: eventosProximos });
}

function equipamentosAlocados(req, res) {
  const alocacoes = EventoModel.listarEquipamentosAlocados();
  res.status(200).json({ alocacoes: alocacoes });
}

function remover(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const ok = EventoModel.remover(id);
  if (!ok) {
    return res.status(404).json({ erro: "Evento não encontrado" });
  }
  res.status(204).send();
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
