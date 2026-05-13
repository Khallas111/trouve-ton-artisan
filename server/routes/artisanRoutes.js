const express = require("express");
const router = express.Router();

const {
  getAllArtisans,
  getOneArtisan,
} = require("../controllers/artisanController");
router.get("/", getAllArtisans);
router.get("/:id", getOneArtisan);
module.exports = router;
