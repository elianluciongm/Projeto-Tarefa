const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Tarefa = sequelize.define(
    "Tarefa",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        titulo: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        descricao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        concluida: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        tableName: "tarefas",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

module.exports = Tarefa;