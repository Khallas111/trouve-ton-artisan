const fs = require("fs");
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

function toBoolean(value, defaultValue = false) {
  if (value === undefined) {
    return defaultValue;
  }

  return value === "true";
}

function getSslConfig() {
  if (!toBoolean(process.env.DB_SSL, false)) {
    return undefined;
  }

  const sslConfig = {
    rejectUnauthorized: toBoolean(process.env.DB_SSL_REJECT_UNAUTHORIZED, true),
  };

  if (process.env.DB_SSL_CA_BASE64) {
    sslConfig.ca = Buffer.from(process.env.DB_SSL_CA_BASE64, "base64").toString("utf8");
  } else if (process.env.DB_SSL_CA_PATH) {
    sslConfig.ca = fs.readFileSync(process.env.DB_SSL_CA_PATH, "utf8");
  }

  return sslConfig;
}

const sslConfig = getSslConfig();

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    port: databaseConfig.port,
    dialect: "mysql",
    logging: false,
    dialectOptions: sslConfig
      ? {
          ssl: sslConfig,
        }
      : undefined,
  },
);

async function ensureDatabaseExists() {
  if (toBoolean(process.env.DB_SKIP_CREATE, false)) {
    return;
  }

  const connection = await mysql.createConnection({
    host: databaseConfig.host,
    port: databaseConfig.port,
    user: databaseConfig.username,
    password: databaseConfig.password,
    ssl: sslConfig,
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
