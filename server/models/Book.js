const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Book = sequelize.define("book", {
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
  release_date: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: false,
  },
  number_of_books: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  number_of_page: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
});

module.exports = Book;
