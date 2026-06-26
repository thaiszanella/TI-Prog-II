const express = require("express");
const router = express.Router();
const HistoricoController = require("../controllers/historicoController");
const autenticar = require("../middlewares/autenticar");

router.get("/", autenticar, HistoricoController.listar);
router.get("/:id", autenticar, HistoricoController.buscar);
router.post("/", autenticar, HistoricoController.registrar);

module.exports = router;
