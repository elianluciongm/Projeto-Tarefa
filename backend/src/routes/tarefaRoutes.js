const express = require("express");

const {
    listarTarefas,
    criarTarefa,
    atualizarTarefa,
    alternarConclusao,
    deletarTarefa,
} = require("../controllers/tarefaController");

const router = express.Router();

router.get("/tarefas", listarTarefas);
router.post("/tarefas", criarTarefa);
router.put("/tarefas/:id", atualizarTarefa);
router.patch("/tarefas/:id/concluir", alternarConclusao);
router.delete("/tarefas/:id", deletarTarefa);

module.exports = router;