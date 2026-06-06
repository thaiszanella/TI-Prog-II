const express = require("express");
const router = express.Router();
const SugestaoController = require("../controllers/sugestaoController");

router.get("/", SugestaoController.listar);
router.get("/:id", SugestaoController.buscar);
router.post("/", SugestaoController.criar);

module.exports = router;
