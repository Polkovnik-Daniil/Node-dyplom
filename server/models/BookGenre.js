const sequelize = require("../db");
const { DataTypes } = require("sequelize");

//связующая таблица
const BookGenre = sequelize.define("BookGenre", {
  bookId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: false,
  },
  genreId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

module.exports = BookGenre;
