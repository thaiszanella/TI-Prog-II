const express = require("express");
const router = express.Router();
const EventoController = require("../controllers/eventoController");
const autenticar = require("../middlewares/autenticar");
const autorizar = require("../middlewares/autorizar");

router.get("/", autenticar, EventoController.listar);
router.get("/proximos", autenticar, EventoController.proximos);
router.get(
  "/equipamentos-alocados",
  autenticar,
  EventoController.equipamentosAlocados,
);
router.get("/:id", autenticar, EventoController.buscar);
router.post("/", autenticar, EventoController.criar);
router.patch("/:id", autenticar, EventoController.atualizar);
router.patch(
  "/:id/cancelar",
  autenticar,
  autorizar("administrador"),
  EventoController.cancelar,
);
router.patch(
  "/:id/finalizar",
  autenticar,
  autorizar("administrador"),
  EventoController.finalizar,
);
router.delete(
  "/:id",
  autenticar,
  autorizar("administrador"),
  EventoController.remover,
);

module.exports = router;
