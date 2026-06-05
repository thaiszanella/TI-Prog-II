const express = require("express");
const router = express.Router();
const ContaReceberController = require("../controllers/contaReceberController");

router.get("/", ContaReceberController.listar);
router.get("/:id", ContaReceberController.buscar);
router.post("/", ContaReceberController.criar);
router.patch("/:id", ContaReceberController.atualizar);
router.patch("/:id/cancelar", ContaReceberController.cancelar);
router.delete("/:id", ContaReceberController.remover);

module.exports = router;
