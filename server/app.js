const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const artisanRoutes = require("./routes/artisanRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const swaggerSpec = require("./docs/swagger");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API OK");
});

// Expose le document OpenAPI brut pour les outils et les tests, en plus de l'interface.
app.get("/api/docs.json", (req, res) => {
  res.json(swaggerSpec);
});

// Monte Swagger UI sous /api/docs pour garder une API auto-documentee.
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/artisans", artisanRoutes);
app.use("/api/categories", categoryRoutes);

module.exports = app;
