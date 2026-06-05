const UsuarioModel = require("../models/usuarioModel");

function listar(req, res) {
  const usuarios = UsuarioModel.listarTodos(req.query);
  res.status(200).json({ total: usuarios.length, usuarios });
}

function buscar(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const usuario = UsuarioModel.buscarPorId(id);
  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  res.status(200).json(usuario);
}

function cadastrar(req, res) {
  try {
    const novoUsuario = UsuarioModel.criar(req.body);
    res
      .status(201)
      .set("Location", "/api/usuarios/" + novoUsuario.id)
      .json(novoUsuario);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

function login(req, res) {
  const { nome, email, senha } = req.body;

  if ((!nome && !email) || !senha) {
    return res.status(400).json({
      erro: "Campos obrigatórios: email ou nome, senha",
    });
  }

  try {
    const usuario = UsuarioModel.login(nome, email, senha);

    if (!usuario) {
      return res.status(401).json({ erro: "Credenciais inválidas" });
    }

    res.status(200).json({ mensagem: "Login realizado com sucesso", usuario });
  } catch (err) {
    res.status(403).json({ erro: err.message });
  }
}

function atualizar(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    const usuario = UsuarioModel.atualizar(id, req.body);
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    res.status(200).json(usuario);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

function alterarStatus(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ erro: "Campo obrigatório: status" });
  }

  try {
    const usuario = UsuarioModel.alterarStatus(id, status);
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    res.status(200).json(usuario);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

function remover(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const ok = UsuarioModel.remover(id);
  if (!ok) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }
  res.status(204).send();
}

module.exports = {
  listar,
  buscar,
  cadastrar,
  login,
  atualizar,
  alterarStatus,
  remover,
};
