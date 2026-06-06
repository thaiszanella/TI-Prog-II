let usuarios = [
  {
    id: 1,
    nome: "Administrador",
    email: "admin@w2.com",
    cpf: "000.000.000-00",
    cep: "89800-000",
    dataNascimento: "1990-01-01",
    telefone: "49999999999",
    areaAtuacao: "administracao",
    senha: "admin123",
    tipo: "administrador",
    status: "ativo",
    foto: null,
  },
];

let proximoId = 2;

//Valida email já cadastrado, se id for passado ignora usuário com esse id (atualização)
function emailJaCadastrado(email, id = null) {
  return usuarios.some((u) => u.email === email && u.id !== id);
}

//Valida CPF já cadastrado, se id for passado ignora usuário com esse id (atualização)
function cpfJaCadastrado(cpf, id = null) {
  return usuarios.some((u) => u.cpf === cpf && u.id !== id);
}

//Lista todos os usuários, permite filtrar por tipo e status
function listarTodos(filtros = {}) {
  let resultado = [...usuarios];

  if (filtros.tipo)
    resultado = resultado.filter((u) => u.tipo === filtros.tipo);

  if (filtros.status)
    resultado = resultado.filter((u) => u.status === filtros.status);

  return resultado;
}

//Busca usuário por ID, retorna null se não encontrado
function buscarPorId(id) {
  return usuarios.find((u) => u.id === id) || null;
}

//RF01 - Cadastro de usuário
//Cria usuário e valida campos obrigatórios e email/cpf existentes
function criar(dados) {
  const {
    nome,
    email,
    cpf,
    cep,
    dataNascimento,
    telefone,
    areaAtuacao,
    senha,
  } = dados;

  if (
    !nome ||
    !email ||
    !cpf ||
    !cep ||
    !dataNascimento ||
    !telefone ||
    !areaAtuacao ||
    !senha
  ) {
    throw new Error(
      "Campos obrigatórios: nome, email, cpf, cep, dataNascimento, telefone, areaAtuacao e senha",
    );
  }

  if (emailJaCadastrado(email)) {
    throw new Error("E-mail já cadastrado");
  }

  if (cpfJaCadastrado(cpf)) {
    throw new Error("CPF já cadastrado");
  }

  const novoUsuario = {
    id: proximoId++,
    nome,
    email,
    cpf,
    cep,
    dataNascimento,
    telefone,
    areaAtuacao,
    senha,
    tipo: "funcionario",
    status: "ativo",
    foto: null,
  };

  usuarios.push(novoUsuario);
  return novoUsuario;
}

//RF02 - Login
//Permite login por email ou nome, valida senha e status da conta
function login(nome, email, senha) {
  const usuario = usuarios.find(
    (u) => (u.email === email || u.nome === nome) && u.senha === senha,
  );

  if (!usuario) {
    return null;
  }

  if (usuario.status !== "ativo") {
    throw new Error("Conta inativa ou congelada");
  }

  return usuario;
}

//RF13 - Perfil
//Permite atualizar dados do perfil, valida email se for alterado
function atualizar(id, dados) {
  const idx = usuarios.findIndex((u) => u.id === id);

  if (idx === -1) {
    return null;
  }

  if (dados.email && dados.email !== usuarios[idx].email) {
    if (emailJaCadastrado(dados.email, id)) {
      throw new Error("E-mail já em uso");
    }
  }

  usuarios[idx] = { ...usuarios[idx], ...dados, id };
  return usuarios[idx];
}

//RF16 - Gerenciar funcionários
//Permite alterar status do funcionário, valida status permitido
function alterarStatus(id, novoStatus) {
  const idx = usuarios.findIndex((u) => u.id === id);

  if (idx === -1) {
    return null;
  }

  const statuses = ["ativo", "congelado", "inativo"];

  if (!statuses.includes(novoStatus)) {
    throw new Error(
      "Status inválido. Status possíveis: ativo, congelado ou inativo",
    );
  }

  usuarios[idx].status = novoStatus;
  return usuarios[idx];
}

//Remove usuário por ID
function remover(id) {
  const idx = usuarios.findIndex((u) => u.id === id);
  if (idx === -1) {
    return false;
  }
  usuarios.splice(idx, 1);
  return true;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  login,
  atualizar,
  alterarStatus,
  remover,
};
