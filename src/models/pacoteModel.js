let pacotes = [
  {
    id: 1,
    nome: "Pacote Festa",
    descricao: "Sonorização de festas",
    servicos: [2, 3],
  },
  {
    id: 2,
    nome: "Pacote Show",
    descricao: "Sonorização de shows",
    servicos: [1, 3],
  },
];

let proximoId = 3;

//Lista todos os pacotes cadastrados
function listarTodos() {
  return [...pacotes];
}

//Busca um pacote pelo ID, retorna null se não encontrado
function buscarPorId(id) {
  return pacotes.find((p) => p.id === id) || null;
}

//Cria um novo pacote
function criar(dados) {
  const { nome, servicos } = dados;

  if (!nome || !Array.isArray(servicos) || servicos.length === 0) {
    throw new Error(
      "Campos obrigatórios: nome, servicos (deve ser um array com ao menos um serviço)",
    );
  }

  const novoPacote = {
    id: proximoId++,
    nome,
    descricao: dados.descricao || null,
    servicos,
  };

  pacotes.push(novoPacote);
  return novoPacote;
}

//Atualiza um pacote existente
function atualizar(id, dados) {
  const idx = pacotes.findIndex((p) => p.id === id);
  if (idx === -1) {
    return null;
  }

  if (dados.servicos && dados.servicos.length === 0) {
    throw new Error("Deve possuir ao menos um serviço");
  }

  pacotes[idx] = { ...pacotes[idx], ...dados, id };
  return pacotes[idx];
}

//Remove um pacote pelo ID, retorna true se removido ou false se não encontrado
function remover(id) {
  const idx = pacotes.findIndex((p) => p.id === id);
  if (idx === -1) {
    return false;
  }
  pacotes.splice(idx, 1);
  return true;
}

module.exports = { listarTodos, buscarPorId, criar, atualizar, remover };
