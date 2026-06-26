const express = require("express");
const router = express.Router();
const FidelidadeController = require("../controllers/fidelidadeController");
const autenticar = require("../middlewares/autenticar");

router.get("/", autenticar, FidelidadeController.listar);
router.get(
  "/cliente/:clienteId",
  autenticar,
  FidelidadeController.buscarPorCliente,
);
router.post("/adicionar", autenticar, FidelidadeController.adicionarPontos);
router.post("/resgatar", autenticar, FidelidadeController.resgatarPontos);

module.exports = router;
