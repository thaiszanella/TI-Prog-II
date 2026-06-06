const express = require("express");
const router = express.Router();
const PacoteController = require("../controllers/pacoteController");

router.get("/", PacoteController.listar);
router.get("/:id", PacoteController.buscar);
router.post("/", PacoteController.criar);
router.put("/:id", PacoteController.atualizar);
router.delete("/:id", PacoteController.remover);

module.exports = router;
