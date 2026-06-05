let contasReceber = [];
let proximoId = 1;

//Lista todas as contas a receber, permite filtrar por status e clienteId
function listarTodos(filtros = {}) {
  let resultado = [...contasReceber];

  if (filtros.status) {
    resultado = resultado.filter((c) => c.status === filtros.status);
  }

  if (filtros.clienteId) {
    resultado = resultado.filter((c) => c.clienteId === filtros.clienteId);
  }

  return resultado;
}

//Busca conta a receber por ID, retorna null se não encontrado
function buscarPorId(id) {
  return contasReceber.find((c) => c.id === id) || null;
}

//Cria uma nova conta a receber
function criar(dados) {
  const { eventoId, clienteId, valor, dataEmissao, dataVencimento } = dados;

  if (!clienteId || valor === undefined || !dataEmissao || !dataVencimento)
    throw new Error(
      "Campos obrigatórios: clienteId, valor, dataEmissao, dataVencimento",
    );

  if (isNaN(valor) || valor <= 0)
    throw new Error("Valor deve ser um número positivo");

  const novaConta = {
    id: proximoId++,
    eventoId: eventoId || null,
    clienteId,
    valor,
    dataEmissao,
    dataVencimento,
    status: "pendente",
  };

  contasReceber.push(novaConta);
  return novaConta;
}

//Atualiza conta a receber por ID
function atualizar(id, dados) {
  const idx = contasReceber.findIndex((c) => c.id === id);

  if (idx === -1) {
    return null;
  }

  const statuses = ["pendente", "pago", "cancelado"];
  if (dados.status && !statuses.includes(dados.status)) {
    throw new Error(
      "Status inválido. Status validos: pendente, pago ou cancelado",
    );
  }

  contasReceber[idx] = { ...contasReceber[idx], ...dados, id };
  return contasReceber[idx];
}

//Cancela conta a receber por ID
function cancelar(id) {
  const idx = contasReceber.findIndex((c) => c.id === id);

  if (idx === -1) {
    return null;
  }

  contasReceber[idx].status = "cancelado";
  return contasReceber[idx];
}

//Remove conta a receber por ID
function remover(id) {
  const idx = contasReceber.findIndex((e) => e.id === id);
  if (idx === -1) {
    return false;
  }
  contasReceber.splice(idx, 1);
  return true;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  cancelar,
  remover,
};
