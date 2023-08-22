const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  role_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: false,
  },
  refresh_token: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  refresh_token_expiry_time: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  is_locked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    unique: false,
  },
});

const Role = sequelize.define("role", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

const Reader = sequelize.define("reader", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  patrinymic: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  place_of_residence: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

const Genre = sequelize.define("genre", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

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

const Author = sequelize.define("author", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  patrinymic: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

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
