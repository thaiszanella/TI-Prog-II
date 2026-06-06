const express = require("express");
const router = express.Router();
const HistoricoController = require("../controllers/historicoController");

router.get("/", HistoricoController.listar);
router.get("/:id", HistoricoController.buscar);
router.post("/", HistoricoController.registrar);

module.exports = router;
