const express = require("express");
const router = express.Router();
const ClienteController = require("../controllers/clienteController");
const autenticar = require("../middlewares/autenticar");
const autorizar = require("../middlewares/autorizar");

router.get("/", autenticar, ClienteController.listar);
router.get("/:id", autenticar, ClienteController.buscar);
router.post(
  "/",
  autenticar,
  autorizar("administrador"),
  ClienteController.criar,
);
router.patch(
  "/:id",
  autenticar,
  autorizar("administrador"),
  ClienteController.atualizar,
);
router.delete(
  "/:id",
  autenticar,
  autorizar("administrador"),
  ClienteController.remover,
);

module.exports = router;
