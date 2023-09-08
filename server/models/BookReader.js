const sequelize = require("../db");
const { DataTypes } = require("sequelize");

//связующая таблица
const BookReader = sequelize.define("BookReader", {
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
  readerId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: false,
  },
  dateOfIssueOfTheBook: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: false,
  },
  dateOfBookAcceptance: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: false,
  },
});

module.exports = BookReader;
