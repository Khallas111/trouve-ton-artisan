const app = require("./app");
const { sequelize, ensureDatabaseExists } = require("./config/database");

require("./models");

const PORT = Number(process.env.PORT || 5000);

async function startServer() {
  try {
    await ensureDatabaseExists();
    await sequelize.sync();

    console.log("Base synchronisee");

    app.listen(PORT, () => {
      console.log(`Serveur lance sur le port ${PORT}`);
    });
  } catch (error) {
    console.error("Demarrage impossible :", error.message);
    process.exit(1);
  }
}

startServer();
