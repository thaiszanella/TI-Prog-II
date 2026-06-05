const express = require("express");
const router = express.Router();
const FidelidadeController = require("../controllers/fidelidadeController");

router.get("/", FidelidadeController.listar);
router.get("/cliente/:clienteId", FidelidadeController.buscarPorCliente);
router.post("/adicionar", FidelidadeController.adicionarPontos);
router.post("/resgatar", FidelidadeController.resgatarPontos);

module.exports = router;
