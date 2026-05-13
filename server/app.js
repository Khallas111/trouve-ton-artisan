const express = require("express");
const cors = require("cors");

const artisanRoutes = require("./routes/artisanRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API OK");
});

app.use("/api/artisans", artisanRoutes);
app.use("/api/categories", categoryRoutes);

module.exports = app;
