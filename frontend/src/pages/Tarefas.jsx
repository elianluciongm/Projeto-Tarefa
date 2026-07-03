import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Tarefas() {
    const navigate = useNavigate();

    const [tarefas, setTarefas] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [editandoId, setEditandoId] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    async function carregarTarefas() {
        try {
            setCarregando(true);
            setErro("");

            const response = await api.get("/tarefas");
            setTarefas(response.data);
        } catch (error) {
            setErro("Erro ao carregar tarefas.");
            console.error(error);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarTarefas();
    }, []);

    async function salvarTarefa(e) {
        e.preventDefault();

        if (!titulo.trim()) {
            setErro("O título da tarefa é obrigatório.");
            return;
        }

        try {
            setErro("");

            if (editandoId) {
                await api.put(`/tarefas/${editandoId}`, {
                    titulo,
                    descricao,
                });
            } else {
                await api.post("/tarefas", {
                    titulo,
                    descricao,
                });
            }

            limparFormulario();
            carregarTarefas();
        } catch (error) {
            setErro("Erro ao salvar tarefa.");
            console.error(error);
        }
    }

    function editarTarefa(tarefa) {
        setEditandoId(tarefa.id);
        setTitulo(tarefa.titulo);
        setDescricao(tarefa.descricao || "");
    }

    async function alternarConclusao(id) {
        try {
            setErro("");

            await api.patch(`/tarefas/${id}/concluir`);
            carregarTarefas();
        } catch (error) {
            setErro("Erro ao alterar status da tarefa.");
            console.error(error);
        }
    }

    async function deletarTarefa(id) {
        const confirmar = window.confirm("Deseja realmente excluir esta tarefa?");

        if (!confirmar) {
            return;
        }

        try {
            setErro("");

            await api.delete(`/tarefas/${id}`);
            carregarTarefas();
        } catch (error) {
            setErro("Erro ao excluir tarefa.");
            console.error(error);
        }
    }

    function limparFormulario() {
        setEditandoId(null);
        setTitulo("");
        setDescricao("");
    }

    function sair() {
        localStorage.removeItem("logado");
        navigate("/");
    }

    return (
        <div className="tarefas-page">
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h1 className="h3 mb-1">Minhas Tarefas</h1>
                        <p className="text-muted mb-0">
                            Controle simples para testar backend, frontend e deploy.
                        </p>
                    </div>

                    <button className="btn btn-outline-danger" onClick={sair}>
                        Sair
                    </button>
                </div>

                {erro && (
                    <div className="alert alert-danger">
                        {erro}
                    </div>
                )}

                <div className="row g-4">
                    <div className="col-lg-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h2 className="h5 mb-3">
                                    {editandoId ? "Editar tarefa" : "Nova tarefa"}
                                </h2>

                                <form onSubmit={salvarTarefa}>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Título
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Ex: Estudar deploy"
                                            value={titulo}
                                            onChange={(e) => setTitulo(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Descrição
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            placeholder="Descrição opcional"
                                            value={descricao}
                                            onChange={(e) => setDescricao(e.target.value)}
                                        ></textarea>
                                    </div>

                                    <button className="btn btn-primary w-100 mb-2">
                                        {editandoId ? "Salvar alterações" : "Cadastrar tarefa"}
                                    </button>

                                    {editandoId && (
                                        <button
                                            type="button"
                                            className="btn btn-secondary w-100"
                                            onClick={limparFormulario}
                                        >
                                            Cancelar edição
                                        </button>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h2 className="h5 mb-3">Lista de tarefas</h2>

                                {carregando ? (
                                    <p className="text-muted">Carregando tarefas...</p>
                                ) : tarefas.length === 0 ? (
                                    <p className="text-muted">
                                        Nenhuma tarefa cadastrada ainda.
                                    </p>
                                ) : (
                                    <div className="list-group">
                                        {tarefas.map((tarefa) => (
                                            <div
                                                key={tarefa.id}
                                                className="list-group-item tarefa-item"
                                            >
                                                <div className="d-flex justify-content-between gap-3">
                                                    <div>
                                                        <h3
                                                            className={
                                                                tarefa.concluida
                                                                    ? "h6 mb-1 tarefa-concluida"
                                                                    : "h6 mb-1"
                                                            }
                                                        >
                                                            {tarefa.titulo}
                                                        </h3>

                                                        {tarefa.descricao && (
                                                            <p className="mb-2 text-dark">
                                                                {tarefa.descricao}
                                                            </p>
                                                        )}

                                                        <span
                                                            className={
                                                                tarefa.concluida
                                                                    ? "badge text-bg-success"
                                                                    : "badge text-bg-warning"
                                                            }
                                                        >
                                                            {tarefa.concluida
                                                                ? "Concluída"
                                                                : "Pendente"}
                                                        </span>
                                                    </div>

                                                    <div className="d-flex flex-column gap-2 botoes-tarefa">
                                                        <button
                                                            className={
                                                                tarefa.concluida
                                                                    ? "btn btn-sm btn-outline-warning"
                                                                    : "btn btn-sm btn-outline-success"
                                                            }
                                                            onClick={() =>
                                                                alternarConclusao(tarefa.id)
                                                            }
                                                        >
                                                            {tarefa.concluida
                                                                ? "Desmarcar"
                                                                : "Concluir"}
                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={() => editarTarefa(tarefa)}
                                                        >
                                                            Editar
                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() =>
                                                                deletarTarefa(tarefa.id)
                                                            }
                                                        >
                                                            Excluir
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tarefas;