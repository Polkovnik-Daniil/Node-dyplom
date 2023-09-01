const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Book = sequelize.define("Book", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  releaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: false,
  },
  numberOfBooks: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  numberOfPage: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
});

module.exports = Book;
