const FidelidadeModel = require("../models/fidelidadeModel");

function listar(req, res) {
  const registros = FidelidadeModel.listarTodos();
  res.status(200).json({ total: registros.length, registros });
}

function buscarPorCliente(req, res) {
  const clienteId = parseInt(req.params.clienteId);

  if (isNaN(clienteId)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const registro = FidelidadeModel.buscarPorCliente(clienteId);
  if (!registro) {
    return res
      .status(404)
      .json({ erro: "Nenhum registro de fidelidade para este cliente" });
  }
  res.status(200).json(registro);
}

function adicionarPontos(req, res) {
  const { clienteId, eventoId, avaliacao } = req.body;

  if (!clienteId || !eventoId || avaliacao === undefined) {
    return res.status(400).json({
      erro: "Campos obrigatórios: clienteId, eventoId, avaliacao (1-5)",
    });
  }

  try {
    const registro = FidelidadeModel.adicionarPontos(
      clienteId,
      eventoId,
      Number(avaliacao),
    );
    res
      .status(200)
      .json({ mensagem: "Pontos adicionados com sucesso", registro });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

function resgatarPontos(req, res) {
  const { clienteId, pontos } = req.body;

  if (!clienteId || pontos === undefined)
    return res
      .status(400)
      .json({ erro: "Campos obrigatórios: clienteId, pontos" });

  try {
    const resultado = FidelidadeModel.resgatarPontos(clienteId, Number(pontos));
    res.status(200).json({
      mensagem: "Pontos resgatados com sucesso",
      desconto: resultado.desconto,
      saldoRestante: resultado.registro.pontos,
    });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

module.exports = { listar, buscarPorCliente, adicionarPontos, resgatarPontos };
