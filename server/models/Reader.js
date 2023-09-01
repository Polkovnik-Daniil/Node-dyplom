const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Reader = sequelize.define("Reader", {
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
  placeOfResidence: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

module.exports = Reader;
