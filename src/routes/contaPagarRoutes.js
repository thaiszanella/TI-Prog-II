const express = require("express");
const router = express.Router();
const ContaPagarController = require("../controllers/contaPagarController");

router.get("/", ContaPagarController.listar);
router.get("/:id", ContaPagarController.buscar);
router.post("/", ContaPagarController.criar);
router.patch("/:id", ContaPagarController.atualizar);
router.delete("/:id", ContaPagarController.remover);

module.exports = router;
