const express = require("express");
const router = express.Router();
const ContaReceberController = require("../controllers/contaReceberController");
const autenticar = require("../middlewares/autenticar");
const autorizar = require("../middlewares/autorizar");

router.get("/", autenticar, ContaReceberController.listar);
router.get("/:id", autenticar, ContaReceberController.buscar);
router.post(
  "/",
  autenticar,
  autorizar("administrador"),
  ContaReceberController.criar,
);
router.patch(
  "/:id",
  autenticar,
  autorizar("administrador"),
  ContaReceberController.atualizar,
);
router.patch(
  "/:id/cancelar",
  autenticar,
  autorizar("administrador"),
  ContaReceberController.cancelar,
);
router.delete(
  "/:id",
  autenticar,
  autorizar("administrador"),
  ContaReceberController.remover,
);

module.exports = router;
