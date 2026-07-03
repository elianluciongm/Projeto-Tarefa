import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    function entrar(e) {
        e.preventDefault();

        if (email === "admin@email.com" && senha === "123456") {
            localStorage.setItem("logado", "true");
            navigate("/tarefas");
        } else {
            setErro("E-mail ou senha incorretos.");
        }
    }

    return (
        <div className="login-page">
            <div className="card login-card shadow">
                <div className="card-body">
                    <h1 className="h3 text-center mb-3">Lista de Tarefas</h1>

                    <p className="text-center text-muted mb-4">
                        Faça login para acessar suas tarefas.
                    </p>

                    {erro && (
                        <div className="alert alert-danger py-2">
                            {erro}
                        </div>
                    )}

                    <form onSubmit={entrar}>
                        <div className="mb-3">
                            <label className="form-label">E-mail</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="admin@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Senha</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="123456"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>

                        <button className="btn btn-primary w-100">
                            Entrar
                        </button>
                    </form>

                    <div className="mt-4 small text-muted text-center">
                        <strong>Login teste:</strong><br />
                        admin@email.com / 123456
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;