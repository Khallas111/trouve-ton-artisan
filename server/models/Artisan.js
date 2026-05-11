const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Artisan = sequelize.define("Artisan", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  specialty: {
    type: DataTypes.STRING,
  },

  rating: {
    type: DataTypes.FLOAT,
  },

  city: {
    type: DataTypes.STRING,
  },

  about: {
    type: DataTypes.TEXT,
  },

  email: {
    type: DataTypes.STRING,
  },

  website: {
    type: DataTypes.STRING,
  },

  top: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Artisan;
