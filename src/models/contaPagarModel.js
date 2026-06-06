let contasPagar = [];
let proximoId = 1;

//Lista todas as contas a pagar, com opção de filtro por status e tipo
function listarTodos(filtros = {}) {
  let resultado = [...contasPagar];

  if (filtros.status) {
    resultado = resultado.filter((c) => c.status === filtros.status);
  }

  return resultado;
}

//Busca conta a pagar por ID, retorna null se não encontrado
function buscarPorId(id) {
  return contasPagar.find((c) => c.id === id) || null;
}

//Cria uma nova conta a pagar
function criar(dados) {
  const { descricao, valor, dataEmissao, dataVencimento } = dados;

  if (!descricao || valor === undefined || !dataEmissao || !dataVencimento) {
    throw new Error(
      "Campos obrigatórios: descricao, valor, dataEmissao, dataVencimento",
    );
  }

  if (isNaN(valor) || valor <= 0) {
    throw new Error("Valor deve ser um número positivo");
  }

  const novaConta = {
    id: proximoId++,
    descricao,
    valor,
    dataEmissao,
    dataVencimento,
    status: "pendente",
    condicoesPagamento: dados.condicoesPagamento || null,
  };

  contasPagar.push(novaConta);
  return novaConta;
}

//Atualiza conta a pagar por ID
function atualizar(id, dados) {
  const idx = contasPagar.findIndex((c) => c.id === id);

  if (idx === -1) {
    return null;
  }

  const statuses = ["pendente", "pago", "cancelado"];
  if (dados.status && !statuses.includes(dados.status)) {
    throw new Error(
      "Status inválido. Status válidos: pendente, pago ou cancelado",
    );
  }

  contasPagar[idx] = { ...contasPagar[idx], ...dados, id };
  return contasPagar[idx];
}

//Remove conta a pagar por ID, retorna true se removido ou false se não encontrado
function remover(id) {
  const idx = contasPagar.findIndex((c) => c.id === id);
  if (idx === -1) {
    return false;
  }
  contasPagar.splice(idx, 1);
  return true;
}

module.exports = { listarTodos, buscarPorId, criar, atualizar, remover };
