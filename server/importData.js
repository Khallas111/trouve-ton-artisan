const xlsx = require("xlsx");

const { sequelize, ensureDatabaseExists } = require("./config/database");
const { Category, Artisan } = require("./models");

const workbook = xlsx.readFile("./data/data.xlsx");
const sheetName = workbook.SheetNames[0];
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

async function findExistingArtisan(item, categoryId) {
  if (item.Email) {
    const artisanByEmail = await Artisan.findOne({
      where: {
        email: item.Email,
      },
    });

    if (artisanByEmail) {
      return artisanByEmail;
    }
  }

  return Artisan.findOne({
    where: {
      name: item.Nom,
      city: item.Ville,
      categoryId,
    },
  });
}

async function importData() {
  let createdCount = 0;
  let updatedCount = 0;

  try {
    await ensureDatabaseExists();
    await sequelize.sync();

    for (const item of data) {
      let category = await Category.findOne({
        where: {
          name: item["Catégorie"],
        },
      });

      if (!category) {
        category = await Category.create({
          name: item["Catégorie"],
        });
      }

      const artisanPayload = {
        name: item.Nom,
        specialty: item["Spécialité"],
        rating: Number(item.Note),
        city: item.Ville,
        about: item["A propos"],
        email: item.Email,
        website: item["Site Web"],
        top: Boolean(item.Top),
        categoryId: category.id,
      };

      const existingArtisan = await findExistingArtisan(item, category.id);

      if (existingArtisan) {
        await existingArtisan.update(artisanPayload);
        updatedCount += 1;
      } else {
        await Artisan.create(artisanPayload);
        createdCount += 1;
      }
    }

    console.log(
      `Import termine : ${createdCount} artisan(s) cree(s), ${updatedCount} mis a jour.`,
    );
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

importData();
