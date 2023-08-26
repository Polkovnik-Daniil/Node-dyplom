const sequelize = require("../db");
const { DataTypes } = require("sequelize");

//связующая таблица
const BookReader = sequelize.define("book_reader", {
  book_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: false,
  },
  reader_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: false,
  },
  date_of_issue_of_the_book: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: false,
  },
  date_of_book_acceptance: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: false,
  },
});

module.exports = BookReader;
