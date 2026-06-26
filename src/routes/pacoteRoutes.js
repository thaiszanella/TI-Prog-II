const express = require("express");
const router = express.Router();
const PacoteController = require("../controllers/pacoteController");
const autenticar = require("../middlewares/autenticar");
const autorizar = require("../middlewares/autorizar");

router.get("/", autenticar, PacoteController.listar);
router.get("/:id", autenticar, PacoteController.buscar);
router.post(
  "/",
  autenticar,
  autorizar("administrador"),
  PacoteController.criar,
);
router.patch(
  "/:id",
  autenticar,
  autorizar("administrador"),
  PacoteController.atualizar,
);
router.delete(
  "/:id",
  autenticar,
  autorizar("administrador"),
  PacoteController.remover,
);

module.exports = router;
