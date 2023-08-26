const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = require("./User");
const Role = require("./Role");
const Reader = require("./Reader");
const Genre = require("./Genre");
const Book = require("./Book");
const Author = require("./Author");
//связующая таблица
const BookReader = require("./BookReader");
//связующая таблица
const BookGenre = require("./BookGenre");
//связующая таблица
const BookAuthor = require("./BookAuthor");
//BookGenre
Book.belongsToMany(Genre, { through: BookGenre, foreignKey: "book_id" });
Genre.belongsToMany(Book, { through: BookGenre, foreignKey: "genre_id" });

//BookReader
Book.belongsToMany(Reader, { through: BookReader, foreignKey: "book_id" });
Reader.belongsToMany(Book, { through: BookReader, foreignKey: "reader_id" });

Book.belongsToMany(User, { through: BookReader, foreignKey: "book_id" });
User.belongsToMany(Book, { through: BookReader, foreignKey: "user_id" });

User.belongsToMany(Reader, { through: BookReader, foreignKey: "user_id" });
Reader.belongsToMany(User, { through: BookReader, foreignKey: "reader_id" });
//BookAuthor
Book.belongsToMany(Author, { through: BookAuthor, foreignKey: "book_id" });
Author.belongsToMany(Book, { through: BookAuthor, foreignKey: "author_id" });

//relationship between Role and User
Role.hasMany(User, { foreignKey: "role_id" });

module.exports = {
  User,
  Role,
  Reader,
  Genre,
  Book,
  Author,
  BookReader,
  BookGenre,
  BookAuthor,
};
