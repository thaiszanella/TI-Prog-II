const express = require("express");
const router = express.Router();
const EquipamentoController = require("../controllers/equipamentoController");

router.get("/", EquipamentoController.listar);
router.get("/:id", EquipamentoController.buscar);
router.post("/", EquipamentoController.criar);
router.patch("/:id", EquipamentoController.atualizar);
router.delete("/:id", EquipamentoController.remover);

module.exports = router;
