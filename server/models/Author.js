const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Author = sequelize.define("author", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  patrinymic: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

module.exports = Author;
