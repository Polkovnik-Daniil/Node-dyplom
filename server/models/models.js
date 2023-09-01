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
Book.belongsToMany(Genre, { through: BookGenre, foreignKey: "bookId" });
Genre.belongsToMany(Book, { through: BookGenre, foreignKey: "genreId" });

//BookReader
Book.belongsToMany(Reader, { through: BookReader, foreignKey: "bookId" });
Reader.belongsToMany(Book, { through: BookReader, foreignKey: "readerId" });

Book.belongsToMany(User, { through: BookReader, foreignKey: "bookId" });
User.belongsToMany(Book, { through: BookReader, foreignKey: "userId" });

User.belongsToMany(Reader, { through: BookReader, foreignKey: "userId" });
Reader.belongsToMany(User, { through: BookReader, foreignKey: "readerId" });
//BookAuthor
Book.belongsToMany(Author, { through: BookAuthor, foreignKey: "bookId" });
Author.belongsToMany(Book, { through: BookAuthor, foreignKey: "authorId" });

//relationship between Role and User
Role.hasMany(User, { foreignKey: "roleId" });


//add default value in DB
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

