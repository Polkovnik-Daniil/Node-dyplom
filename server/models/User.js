const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  roleId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: false,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  refreshTokenExpiryTime: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  isLocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    unique: false,
  },
});

module.exports = User;
