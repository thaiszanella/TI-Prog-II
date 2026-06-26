const express = require("express");
const router = express.Router();
const SugestaoController = require("../controllers/sugestaoController");
const autenticar = require("../middlewares/autenticar");

router.get("/", autenticar, SugestaoController.listar);
router.get("/:id", autenticar, SugestaoController.buscar);
router.post("/", autenticar, SugestaoController.criar);

module.exports = router;
