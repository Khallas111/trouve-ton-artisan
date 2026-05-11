const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

require("dotenv").config();

const databaseConfig = {
  database: process.env.DB_NAME || "trouve_ton_artisan",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
};

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    port: databaseConfig.port,
    dialect: "mysql",
    logging: false,
  },
);

async function ensureDatabaseExists() {
  const connection = await mysql.createConnection({
    host: databaseConfig.host,
    port: databaseConfig.port,
    user: databaseConfig.username,
    password: databaseConfig.password,
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${databaseConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`,
  );

  await connection.end();
}

module.exports = {
  sequelize,
  ensureDatabaseExists,
};
