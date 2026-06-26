const express = require("express");
const router = express.Router();
const ContaPagarController = require("../controllers/contaPagarController");
const autenticar = require("../middlewares/autenticar");
const autorizar = require("../middlewares/autorizar");

router.get("/", autenticar, ContaPagarController.listar);
router.get("/:id", autenticar, ContaPagarController.buscar);
router.post(
  "/",
  autenticar,
  autorizar("administrador"),
  ContaPagarController.criar,
);
router.patch(
  "/:id",
  autenticar,
  autorizar("administrador"),
  ContaPagarController.atualizar,
);
router.delete(
  "/:id",
  autenticar,
  autorizar("administrador"),
  ContaPagarController.remover,
);

module.exports = router;
