const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/dashboardController");

router.get("/resumo", DashboardController.resumo);
router.get("/financeiro", DashboardController.financeiro);
router.get("/eventos", DashboardController.eventos);
router.get("/alertas", DashboardController.alertas);

module.exports = router;
