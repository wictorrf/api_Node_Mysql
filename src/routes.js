const express = require("express");
const router = express.Router();

const CarroController = require("./controllers/carroController");

router.get("/carros", CarroController.buscarTodos);
router.get("/carro/:codigo", CarroController.buscarUm);
router.post("/carro", CarroController.inserirCarro);
router.put("/carro/:codigo", CarroController.alterarCarro);
router.delete("/carro/:codigo", CarroController.deletarCarro);

module.exports = router;