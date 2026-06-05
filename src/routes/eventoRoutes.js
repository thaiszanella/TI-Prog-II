const express = require("express");
const router = express.Router();
const EventoController = require("../controllers/eventoController");

router.get("/", EventoController.listar);
router.get("/proximos", EventoController.proximos);
router.get("/equipamentos-alocados", EventoController.equipamentosAlocados);
router.get("/:id", EventoController.buscar);
router.post("/", EventoController.criar);
router.patch("/:id", EventoController.atualizar);
router.patch("/:id/cancelar", EventoController.cancelar);
router.patch("/:id/finalizar", EventoController.finalizar);

module.exports = router;
