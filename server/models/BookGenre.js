const sequelize = require("../db");
const { DataTypes } = require("sequelize");

//связующая таблица
const BookGenre = sequelize.define("BookGenre", {
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
  genreId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

module.exports = BookGenre;
