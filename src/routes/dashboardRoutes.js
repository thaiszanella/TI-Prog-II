const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/dashboardController");
const autenticar = require("../middlewares/autenticar");

router.get("/resumo", autenticar, DashboardController.resumo);
router.get("/financeiro", autenticar, DashboardController.financeiro);
router.get("/eventos", autenticar, DashboardController.eventos);
router.get("/alertas", autenticar, DashboardController.alertas);

module.exports = router;
