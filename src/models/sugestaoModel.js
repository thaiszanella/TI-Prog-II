let sugestoes = [];
let proximoId = 1;

//Lista todas as sugestões, com opção de filtro por eventoId ou usuarioId
function listarTodos(filtros = {}) {
  let resultado = [...sugestoes];
  if (filtros.eventoId) {
    resultado = resultado.filter(
      (s) => s.eventoId === Number(filtros.eventoId),
    );
  }

  if (filtros.usuarioId) {
    resultado = resultado.filter(
      (s) => s.usuarioId === Number(filtros.usuarioId),
    );
  }
  return resultado;
}

//Busca uma sugestão pelo ID, retorna null se não encontrado
function buscarPorId(id) {
  return sugestoes.find((s) => s.id === id) || null;
}

//Cria uma nova sugestão
function criar(dados) {
  const { eventoId, usuarioId, descricao } = dados;

  if (!eventoId || !usuarioId || !descricao) {
    throw new Error("Campos obrigatórios: eventoId, usuarioId e descricao");
  }

  const novaSugestao = {
    id: proximoId++,
    eventoId,
    usuarioId,
    descricao,
    dataCriacao: new Date().toISOString(),
  };

  sugestoes.push(novaSugestao);
  return novaSugestao;
}

module.exports = { listarTodos, buscarPorId, criar };
