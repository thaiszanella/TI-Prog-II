let historico = [];
let proximoId = 1;

//Lista todos os registros, com opção de filtro por clienteId, funcionarioId ou eventoId
function listarTodos(filtros = {}) {
  let resultado = [...historico];

  if (filtros.clienteId) {
    resultado = resultado.filter((h) => h.clienteId === Number(filtros.clienteId));
  }

  if (filtros.funcionarioId) {
    resultado = resultado.filter(
      (h) => h.funcionarioId === Number(filtros.funcionarioId),
    );
  }

  if (filtros.eventoId) {
    resultado = resultado.filter(
      (h) => h.eventoId === Number(filtros.eventoId),
    );
  }

  return resultado;
}

//Busca um registro pelo ID, retorna null se não encontrado
function buscarPorId(id) {
  return historico.find((h) => h.id === id) || null;
}

//Registra um novo atendimento
function registrar(dados) {
  const { eventoId, clienteId, funcionarioId, tipoServico, valorTotal } = dados;

  if (!eventoId || !clienteId || !funcionarioId || !tipoServico || !valorTotal)
    throw new Error("Campos obrigatórios ausentes");

  const percentualEmpresa =
    dados.percentualEmpresa !== undefined ? dados.percentualEmpresa : 50;
  const percentualFuncionario = 100 - percentualEmpresa;

  const novoRegistro = {
    id: proximoId++,
    eventoId,
    clienteId,
    funcionarioId,
    dataHora: new Date().toISOString(),
    tipoServico,
    valorTotal,
    percentualEmpresa,
    percentualFuncionario,
    valorEmpresa: (valorTotal * percentualEmpresa) / 100,
    valorFuncionario: (valorTotal * percentualFuncionario) / 100,
  };

  historico.push(novoRegistro);
  return novoRegistro;
}

module.exports = { listarTodos, buscarPorId, registrar };
