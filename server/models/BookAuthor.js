const sequelize = require("../db");
const { DataTypes } = require("sequelize");

//связующая таблица
const BookAuthor = sequelize.define("BookAuthor", {
  id : {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
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
