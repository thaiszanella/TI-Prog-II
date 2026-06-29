const express = require("express");
const router = express.Router();
const autenticar = require("../middlewares/autenticar");

const viewController = require("../controllers/viewController");

router.get("/login", viewController.loginPage);
router.get("/dashboard", autenticar, viewController.dashboardPage);
router.get("/clientes", autenticar, viewController.clientesPage);
router.get("/eventos", autenticar, viewController.eventosPage);
router.get("/servicos", autenticar, viewController.servicosPage);
router.get("/pacotes", autenticar, viewController.pacotesPage);
router.get("/financeiro", autenticar, viewController.financeiroPage);
router.get("/equipamentos", autenticar, viewController.equipamentosPage);
router.get("/usuarios", autenticar, viewController.usuariosPage);
router.get("/fidelidade", autenticar, viewController.fidelidadePage);
router.get("/historico", autenticar, viewController.historicoPage);
router.get("/sugestoes", autenticar, viewController.sugestoesPage);

module.exports = router;
