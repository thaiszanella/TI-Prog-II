const EquipamentoModel = require("./equipamentoModel");

let eventos = [];
let proximoId = 1;

//Lista todos os eventos, permite filtrar por status, cliente e funcionário
function listarTodos(filtros = {}) {
  let resultado = [...eventos];

  if (filtros.status) {
    resultado = resultado.filter((e) => e.status === filtros.status);
  }

  if (filtros.clienteId) {
    resultado = resultado.filter((e) => e.clienteId === filtros.clienteId);
  }

  if (filtros.funcionarioId) {
    resultado = resultado.filter((e) =>
      e.funcionarios.includes(Number(filtros.funcionarioId)),
    );
  }

  return resultado;
}

//Busca evento por ID, retorna null se não encontrado
function buscarPorId(id) {
  return eventos.find((e) => e.id === id) || null;
}

//RF03 - Agenda de eventos
//RF11 - Verifica disponibilidade de equipamentos na data
//Cria evento e valida campos obrigatórios, disponibilidade de equipamentos e funcionários
function criar(dados) {
  const { pacoteId, clienteId, dataHora, duracao, funcionarios, equipamentos } =
    dados;

  if (!pacoteId || !clienteId || !dataHora || !duracao) {
    throw new Error("Campos obrigatórios ausentes");
  }

  if (!Array.isArray(funcionarios) || funcionarios.length === 0) {
    throw new Error("É necessário ao menos um funcionário no evento");
  }

  const equipamentosEvento = Array.isArray(equipamentos) ? equipamentos : [];

  if (
    equipamentosEvento.length > 0 &&
    !EquipamentoModel.verificarDisponibilidade(
      equipamentosEvento,
      eventos,
      dataHora,
    )
  ) {
    throw new Error("Equipamentos indisponíveis para a data");
  }

  const novoEvento = {
    id: proximoId++,
    pacoteId,
    clienteId,
    dataHora,
    duracao,
    informacoesExecucao: dados.informacoesExecucao || null,
    funcionarios,
    equipamentos: equipamentosEvento,
    status: "agendado",
    pontosAtribuidos: dados.pontosAtribuidos || 0,
  };

  eventos.push(novoEvento);
  return novoEvento;
}

//RF03 - Cancelamento de eventos
//Cancela evento
function cancelar(id) {
  const idx = eventos.findIndex((e) => e.id === id);
  if (idx === -1) {
    return false;
  }
  eventos[idx].status = "cancelado";
  return eventos[idx];
}

//RF03 - Finalização de eventos
//Finaliza evento
function finalizar(id) {
  const idx = eventos.findIndex((e) => e.id === id);
  if (idx === -1) {
    return false;
  }

  eventos[idx].status = "finalizado";
  return eventos[idx];
}

//RF03 - Edição de eventos
//Permite editar evento, valida campos obrigatórios, disponibilidade de equipamentos e funcionários
function atualizar(id, dados) {
  const idx = eventos.findIndex((e) => e.id === id);
  if (idx === -1) {
    return false;
  }

  if (eventos[idx].status === "cancelado") {
    throw new Error("Não é possível editar um evento cancelado");
  }

  // Se mudar equipamentos ou data, reverifica disponibilidade
  const novosEquipamentos = dados.equipamentos ?? eventos[idx].equipamentos;
  const novaData = dados.dataHora ?? eventos[idx].dataHora;

  if (
    equipamentosEvento.length > 0 &&
    !EquipamentoModel.verificarDisponibilidade(
      equipamentosEvento,
      eventos,
      dataHora,
      id,
    )
  ) {
    throw new Error("Equipamentos indisponíveis para a data");
  }

  eventos[idx] = { ...eventos[idx], ...dados, id };
  return eventos[idx];
}

//RF04 - Retorna eventos próximos (dentro de 24h) para alertas
function buscarProximos() {
  const agora = new Date();
  const limite = new Date(agora.getTime() + 24 * 60 * 60 * 1000);

  return eventos.filter(
    (e) =>
      e.status === "agendado" &&
      new Date(e.dataHora) >= agora &&
      new Date(e.dataHora) <= limite,
  );
}

//RF11 - Lista equipamentos alocados com o evento correspondente
function listarEquipamentosAlocados() {
  const alocacoes = [];

  eventos
    .filter((e) => e.status !== "cancelado")
    .forEach((e) => {
      (e.equipamentos || []).forEach(({ equipamentoId, quantidade }) => {
        alocacoes.push({
          eventoId: e.id,
          dataHora: e.dataHora,
          status: e.status,
          equipamentoId,
          quantidade,
        });
      });
    });

  return alocacoes;
}

//Remove evento por ID
function remover(id) {
  const idx = eventos.findIndex((e) => e.id === id);
  if (idx === -1) {
    return false;
  }
  eventos.splice(idx, 1);
  return true;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  cancelar,
  finalizar,
  atualizar,
  buscarProximos,
  listarEquipamentosAlocados,
  remover,
};
