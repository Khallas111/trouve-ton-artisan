const app = require("./app");
const { sequelize, ensureDatabaseExists } = require("./config/database");

const PORT = Number(process.env.PORT || 5000);

async function startServer() {
  try {
    await ensureDatabaseExists();
    await sequelize.authenticate();

    app.listen(PORT, () => {
      console.log(`Serveur lance sur le port ${PORT}`);
      console.log("Connexion DB OK");
    });
  } catch (error) {
    console.error("Connexion MySQL impossible :", error.message);
    process.exit(1);
  }
}

startServer();
