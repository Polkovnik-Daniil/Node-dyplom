const sequelize = require("../db");
const { DataTypes } = require("sequelize");

//связующая таблица
const BookGenre = sequelize.define("book_genre", {
  book_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: false,
  },
  genre_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

module.exports = BookGenre;
