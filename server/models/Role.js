const sequelize = require("../db");
const { DataTypes } = require("sequelize");

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

module.exports = Role;
