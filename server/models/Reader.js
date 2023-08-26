const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Reader = sequelize.define("reader", {
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
  place_of_residence: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

module.exports = Reader;
