let equipamentos = [
  {
    id: 1,
    nome: "Caixa de som",
    descricao: "Caixa de som grande",
    fornecedor: null,
    valorLocacao: null,
    quantidade: 2,
  },
  {
    id: 2,
    nome: "Mesa de som",
    descricao: "Mesa de som média",
    fornecedor: null,
    valorLocacao: null,
    quantidade: 1,
  },
  {
    id: 3,
    nome: "Amplificador",
    descricao: "Amplificador de potência",
    fornecedor: "Amplificadores Locações",
    valorLocacao: 150.0,
    quantidade: 2,
  },
];

let proximoId = 4;

//Lista todos os equipamentos, permite filtrar por fornecedor
function listarTodos(filtros = {}) {
  let resultado = [...equipamentos];

  if (filtros.fornecedor !== undefined) {
    resultado = resultado.filter((e) =>
      filtros.fornecedor === true
        ? e.fornecedor !== null
        : e.fornecedor === null,
    );
  }

  return resultado;
}

//Busca equipamento por ID, retorna null se não encontrado
function buscarPorId(id) {
  return equipamentos.find((e) => e.id === id) || null;
}

//RF10 - Registro de equipamentos
//Cria equipamento e valida campos obrigatórios e quantidade
function criar(dados) {
  const { nome, descricao, fornecedor, valorLocacao, quantidade } = dados;

  if (!nome || !quantidade)
    throw new Error("Campos obrigatórios: nome, quantidade");

  if (isNaN(quantidade) || quantidade < 0)
    throw new Error("Quantidade deve ser um número não negativo");

  const novoEquipamento = {
    id: proximoId++,
    nome,
    descricao: descricao || null,
    fornecedor: fornecedor || null,
    valorLocacao: valorLocacao || null,
    quantidade,
  };

  equipamentos.push(novoEquipamento);
  return novoEquipamento;
}

//Atualiza equipamento por ID, valida quantidade e campos permitidos
function atualizar(id, dados) {
  const idx = equipamentos.findIndex((e) => e.id === id);

  if (idx === -1) {
    return null;
  }

  if (dados.quantidade && (isNaN(dados.quantidade) || dados.quantidade < 0)) {
    throw new Error("Quantidade deve ser um número não negativo");
  }

  equipamentos[idx] = { ...equipamentos[idx], ...dados, id };
  return equipamentos[idx];
}

//Remove equipamento por ID
function remover(id) {
  const idx = equipamentos.findIndex((e) => e.id === id);
  if (idx === -1) {
    return false;
  }
  equipamentos.splice(idx, 1);
  return true;
}

// Retorna true se todos os equipamentos necessários estão disponíveis na data
function verificarDisponibilidade(
  alocacoesNecessarias,
  eventosExistentes,
  dataHora,
  id = null,
) {
  const dia = new Date(dataHora).toDateString();

  // Soma o que já está alocado nesse dia (ignora cancelados e o próprio evento)
  const alocado = {};
  for (const e of eventosExistentes) {
    if (e.status === "cancelado" || e.id === id) {
      continue;
    }

    if (new Date(e.dataHora).toDateString() !== dia) {
      continue;
    }

    for (const { equipamentoId, quantidade } of e.equipamentos || []) {
      alocado[equipamentoId] = (alocado[equipamentoId] || 0) + quantidade;
    }
  }

  return alocacoesNecessarias.every(({ equipamentoId, quantidade }) => {
    const equip = equipamentos.find((e) => e.id === equipamentoId);
    if (!equip) return false;
    const disponivel = equip.quantidade - (alocado[equipamentoId] || 0);
    return quantidade <= disponivel;
  });
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  remover,
  verificarDisponibilidade,
};
