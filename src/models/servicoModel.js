let servicos = [
  {
    id: 1,
    nome: "Sonorização de shows",
    descricao: "Sonorização de shows",
    valor: 800.0,
    notaFiscal: null,
  },
  {
    id: 2,
    nome: "Casamentos e festas",
    descricao: "Casamentos e festas",
    valor: 2500.0,
    notaFiscal: null,
  },
  {
    id: 3,
    nome: "Aluguel de equipamento",
    descricao: "Aluguel de equipamento",
    valor: 0,
    notaFiscal: null,
  },
];

let proximoId = 4;

//Lista todos os serviços cadastrados
function listarTodos() {
  return [...servicos];
}

//Busca um serviço pelo ID, retorna null se não encontrado
function buscarPorId(id) {
  return servicos.find((s) => s.id === id) || null;
}

//Cria um novo serviço, validando os campos obrigatórios e o valor
function criar(dados) {
  const { nome, descricao, valor } = dados;

  if (!nome || !valor) {
    throw new Error("Campos obrigatórios ausentes");
  }

  if (isNaN(valor) || valor < 0) {
    throw new Error("Valor deve ser um número não negativo");
  }

  const novoServico = {
    id: proximoId++,
    nome,
    descricao: descricao || null,
    valor,
    notaFiscal: dados.notaFiscal || null,
  };

  servicos.push(novoServico);
  return novoServico;
}

//Atualiza um serviço existente, validando o valor se for fornecido
function atualizar(id, dados) {
  const idx = servicos.findIndex((s) => s.id === id);

  if (idx === -1) {
    return null;
  }

  if (dados.valor && (isNaN(dados.valor) || dados.valor < 0))
    throw new Error("Valor deve ser um número não negativo");

  servicos[idx] = { ...servicos[idx], ...dados, id };
  return servicos[idx];
}

//Remove um serviço pelo ID, retorna true se removido ou false se não encontrado
function remover(id) {
  const idx = servicos.findIndex((s) => s.id === id);

  if (idx === -1) {
    return false;
  }

  servicos.splice(idx, 1);
  return true;
}

module.exports = { listarTodos, buscarPorId, criar, atualizar, remover };
