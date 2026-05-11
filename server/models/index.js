const Category = require("./Category");
const Artisan = require("./Artisan");

Category.hasMany(Artisan, {
  foreignKey: "categoryId",
});

Artisan.belongsTo(Category, {
  foreignKey: "categoryId",
});

module.exports = {
  Category,
  Artisan,
};
