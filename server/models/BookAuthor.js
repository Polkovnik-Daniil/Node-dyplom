const sequelize = require("../db");
const { DataTypes } = require("sequelize");

//связующая таблица
const BookAuthor = sequelize.define("BookAuthor", {
  bookId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: false,
  },
  authorId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: false,
  },
});

module.exports = BookAuthor;
