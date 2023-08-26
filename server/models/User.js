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

module.exports = User;
