const db = require("../models");

async function listar(req, res) {
  try {
    const where = {};
    if (req.query.tipo) {
      where.tipo = req.query.tipo;
    }
    if (req.query.status) {
      where.status = req.query.status;
    }

    const usuarios = await db.Usuario.findAll({
      where,
      attributes: { exclude: ["senha"] },
    });
    res.status(200).json({ total: usuarios.length, usuarios });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function buscar(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const usuario = await db.Usuario.findByPk(id, {
      attributes: { exclude: ["senha"] },
    });

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function cadastrar(req, res) {
  try {
    const usuario = await db.Usuario.create(req.body);
    const { senha, ...semSenha } = usuario.toJSON();
    res.status(201).json(semSenha);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ erro: "E-mail ou CPF já cadastrado" });
    }
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function login(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if ((!nome && !email) || !senha) {
      return res
        .status(400)
        .json({ erro: "Campos obrigatórios: email ou nome, senha" });
    }

    const usuario = await db.Usuario.findOne({
      where: email ? { email } : { nome },
    });

    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ erro: "Credenciais inválidas" });
    }

    if (usuario.status !== "ativo") {
      return res.status(403).json({ erro: "Conta inativa ou congelada" });
    }

    const { senha: _, ...semSenha } = usuario.toJSON();
    res
      .status(200)
      .json({ mensagem: "Login realizado com sucesso", usuario: semSenha });
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const usuario = await db.Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    await usuario.update(req.body);
    const { senha, ...semSenha } = usuario.toJSON();
    res.status(200).json(semSenha);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ erro: "E-mail já em uso" });
    }
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function alterarStatus(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const { status } = req.body;
    const statuses = ["ativo", "congelado", "inativo"];
    if (!status || !statuses.includes(status)) {
      return res.status(400).json({
        erro: "Status inválido. Valores possíveis: ativo, congelado, inativo",
      });
    }

    const usuario = await db.Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    await usuario.update({ status });
    const { senha, ...semSenha } = usuario.toJSON();
    res.status(200).json(semSenha);
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
}

async function remover(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const deletado = await db.Usuario.destroy({ where: { id } });
    if (!deletado) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ erro: "Erro interno" });
  }
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
