const { Artisan, Category } = require("../models");

exports.getAllArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: {
        model: Category,
      },
    });
    res.json(artisans);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des artisans." });
  }
};

exports.getOneArtisan = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: Category,
    });

    if (!artisan) {
      return res.status(404).json({ error: "Artisan non trouvé." });
    }

    res.json(artisan);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de l'artisan." });
  }
};
