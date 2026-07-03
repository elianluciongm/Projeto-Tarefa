const Tarefa = require("../models/Tarefa");

async function listarTarefas(req, res) {
    try {
        const tarefas = await Tarefa.findAll({
            order: [["id", "ASC"]],
        });

        return res.status(200).json(tarefas);
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao listar tarefas.",
            erro: error.message,
        });
    }
}

async function criarTarefa(req, res) {
    try {
        const { titulo, descricao } = req.body;

        if (!titulo) {
            return res.status(400).json({
                mensagem: "O título da tarefa é obrigatório.",
            });
        }

        const tarefa = await Tarefa.create({
            titulo,
            descricao,
            concluida: false,
        });

        return res.status(201).json({
            mensagem: "Tarefa criada com sucesso.",
            tarefa,
        });
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao criar tarefa.",
            erro: error.message,
        });
    }
}

async function atualizarTarefa(req, res) {
    try {
        const { id } = req.params;
        const { titulo, descricao, concluida } = req.body;

        const tarefa = await Tarefa.findByPk(id);

        if (!tarefa) {
            return res.status(404).json({
                mensagem: "Tarefa não encontrada.",
            });
        }

        await tarefa.update({
            titulo: titulo ?? tarefa.titulo,
            descricao: descricao ?? tarefa.descricao,
            concluida: concluida ?? tarefa.concluida,
        });

        return res.status(200).json({
            mensagem: "Tarefa atualizada com sucesso.",
            tarefa,
        });
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao atualizar tarefa.",
            erro: error.message,
        });
    }
}

async function alternarConclusao(req, res) {
    try {
        const { id } = req.params;

        const tarefa = await Tarefa.findByPk(id);

        if (!tarefa) {
            return res.status(404).json({
                mensagem: "Tarefa não encontrada.",
            });
        }

        await tarefa.update({
            concluida: !tarefa.concluida,
        });

        return res.status(200).json({
            mensagem: "Status da tarefa alterado com sucesso.",
            tarefa,
        });
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao alterar status da tarefa.",
            erro: error.message,
        });
    }
}

async function deletarTarefa(req, res) {
    try {
        const { id } = req.params;

        const tarefa = await Tarefa.findByPk(id);

        if (!tarefa) {
            return res.status(404).json({
                mensagem: "Tarefa não encontrada.",
            });
        }

        await tarefa.destroy();

        return res.status(200).json({
            mensagem: "Tarefa deletada com sucesso.",
        });
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao deletar tarefa.",
            erro: error.message,
        });
    }
}

module.exports = {
    listarTarefas,
    criarTarefa,
    atualizarTarefa,
    alternarConclusao,
    deletarTarefa,
};