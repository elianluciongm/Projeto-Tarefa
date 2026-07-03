const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");
const tarefaRoutes = require("./routes/tarefaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).json({
        mensagem: "API de tarefas rodando.",
    });
});

app.use(tarefaRoutes);

const PORT = process.env.PORT || 3000;
async function iniciarServidor() {
    try {
        await sequelize.authenticate();

        console.log("Banco de dados conectado com sucesso.");

        await sequelize.sync();

        console.log("Tabelas sincronizadas com sucesso.");

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao conectar no banco:");
        console.error(error);
    }
}

iniciarServidor();