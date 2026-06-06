const express = require("express");
const router = express.Router();
const ServicoController = require("../controllers/servicoController");

router.get("/", ServicoController.listar);
router.get("/:id", ServicoController.buscar);
router.post("/", ServicoController.criar);
router.patch("/:id", ServicoController.atualizar);
router.delete("/:id", ServicoController.remover);

module.exports = router;
