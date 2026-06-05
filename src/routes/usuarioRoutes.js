const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/usuarioController");

router.post("/", UsuarioController.cadastrar);
router.post("/login", UsuarioController.login);
router.get("/", UsuarioController.listar);
router.get("/:id", UsuarioController.buscar);
router.patch("/:id", UsuarioController.atualizar);
router.patch("/:id/status", UsuarioController.alterarStatus);
router.delete("/:id", UsuarioController.remover);

module.exports = router;
