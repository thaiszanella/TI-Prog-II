const express = require("express");
const router = express.Router();
const ServicoController = require("../controllers/servicoController");
const autenticar = require("../middlewares/autenticar");
const autorizar = require("../middlewares/autorizar");

router.get("/", autenticar, ServicoController.listar);
router.get("/:id", autenticar, ServicoController.buscar);
router.post(
  "/",
  autenticar,
  autorizar("administrador"),
  ServicoController.criar,
);
router.patch(
  "/:id",
  autenticar,
  autorizar("administrador"),
  ServicoController.atualizar,
);
router.delete(
  "/:id",
  autenticar,
  autorizar("administrador"),
  ServicoController.remover,
);

module.exports = router;
