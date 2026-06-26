const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/usuarioController");
const autenticar = require("../middlewares/autenticar");
const autorizar = require("../middlewares/autorizar");

router.post("/", UsuarioController.cadastrar);
router.post("/login", UsuarioController.login);
router.get("/", autenticar, UsuarioController.listar);
router.get("/:id", autenticar, UsuarioController.buscar);
router.patch("/:id", autenticar, UsuarioController.atualizar);
router.patch(
  "/:id/status",
  autenticar,
  autorizar("administrador"),
  UsuarioController.alterarStatus,
);
router.delete(
  "/:id",
  autenticar,
  autorizar("administrador"),
  UsuarioController.remover,
);

module.exports = router;
