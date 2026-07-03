import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Tarefas from "./pages/Tarefas";

function RotaPrivada({ children }) {
  const logado = localStorage.getItem("logado");

  if (!logado) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/tarefas"
          element={
            <RotaPrivada>
              <Tarefas />
            </RotaPrivada>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;