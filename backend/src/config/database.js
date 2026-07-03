const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        logging: false,
        dialectOptions:
            process.env.DB_SSL === "true"
                ? {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false,
                    },
                }
                : {},
    });
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: "postgres",
            logging: false,
        }
    );
}

module.exports = sequelize;