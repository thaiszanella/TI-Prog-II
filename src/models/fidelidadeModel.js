let registros = [];
let proximoId = 1;

//Busca registro de fidelidade por clienteId
function buscarPorCliente(clienteId) {
  return registros.find((r) => r.clienteId === clienteId) || null;
}

//Lista todos os registros de fidelidade
function listarTodos() {
  return [...registros];
}

//Cria registro de fidelidade para um cliente se não existir
function garantirRegistro(clienteId) {
  let registro = buscarPorCliente(clienteId);

  if (!registro) {
    registro = { id: proximoId++, clienteId, pontos: 0, historico: [] };
    registros.push(registro);
  }

  return registro;
}

//RF07 - Adiciona pontos após finalização de evento
function adicionarPontos(clienteId, eventoId, avaliacao) {
  if (avaliacao < 1 || avaliacao > 5)
    throw new Error("Avaliação deve ser entre 1 e 5");

  const registro = garantirRegistro(clienteId);

  const numAtendimentos =
    registro.historico.filter((h) => h.tipo === "ganho").length + 1;
  const pontosGanhos = numAtendimentos * avaliacao;

  registro.pontos += pontosGanhos;
  registro.historico.push({
    tipo: "ganho",
    pontos: pontosGanhos,
    data: new Date().toISOString(),
    eventoId,
    avaliacao,
  });

  return registro;
}

//RF07 - Resgata pontos para desconto (perde os pontos usados)
function resgatarPontos(clienteId, pontosUsados) {
  const registro = buscarPorCliente(clienteId);

  if (!registro || registro.pontos < pontosUsados)
    throw new Error("Pontos insuficientes para resgate");

  if (pontosUsados <= 0)
    throw new Error("Quantidade de pontos para resgate deve ser positiva");

  registro.pontos -= pontosUsados;
  registro.historico.push({
    tipo: "resgate",
    pontos: -pontosUsados,
    data: new Date().toISOString(),
  });

  const desconto = pontosUsados * 0.1; // cada ponto = R$ 0,10 de desconto
  return { registro, desconto };
}

module.exports = {
  listarTodos,
  buscarPorCliente,
  adicionarPontos,
  resgatarPontos,
};
