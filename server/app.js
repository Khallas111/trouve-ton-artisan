const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");

const artisanRoutes = require("./routes/artisanRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const swaggerSpec = require("./docs/swagger");

const app = express();
const allowedOrigins = (process.env.ALLOWED_ORIGINS ||
  "http://localhost:3000,http://127.0.0.1:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const shouldExposeSwagger =
  process.env.NODE_ENV !== "production" ||
  process.env.ENABLE_SWAGGER === "true";
const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX || 200),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message:
      "Trop de requetes ont ete envoyees en peu de temps. Merci de reessayer dans quelques minutes.",
  },
});

app.disable("x-powered-by");

if (process.env.TRUST_PROXY === "true") {
  app.set("trust proxy", 1);
}

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origine non autorisee par la politique CORS."));
    },
  }),
);
app.use(express.json({ limit: "100kb" }));
app.use("/api", apiRateLimiter);

app.get("/", (req, res) => {
  res.send("API OK");
});

if (shouldExposeSwagger) {
  // Expose le document OpenAPI brut pour les outils et les tests, en plus de l'interface.
  app.get("/api/docs.json", (req, res) => {
    res.json(swaggerSpec);
  });

  // Monte Swagger UI sous /api/docs pour garder une API auto-documentee.
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

app.use("/api/artisans", artisanRoutes);
app.use("/api/categories", categoryRoutes);

module.exports = app;
