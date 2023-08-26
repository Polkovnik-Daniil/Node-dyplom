const sequelize = require("../db");
const { DataTypes } = require("sequelize");

//связующая таблица
const BookAuthor = sequelize.define("book_author", {
  book_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: false,
  },
  author_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: false,
  },
});

module.exports = BookAuthor;
