const jwt = require("jsonwebtoken");
const { User, Role } = require("../models/models");
const ApiError = require("../error/ApiError");
const logger = require("../logs/logger");
const bcrypt = require("bcrypt");

class UserService {
  generateJwt(id, email, role, isLocked) {
    return jwt.sign({ id, email, role, isLocked }, process.env.SECRET_KEY, {
      expiresIn: "96h",
    });
  }
  async registration(name, email, role, password, isLocked) {
    try {
      let candidate = await User.findOne({ where: { email: email } });
      if (candidate) {
        logger.error("Пользователь с таким email уже существует");
        throw new Error(
          ApiError.badRequest("Пользователь с таким email уже существует")
        );
      }
      const HASH_PASSWORD = await bcrypt.hash(password, 5);
      role = await Role.findOne({ where: { name: role || "User" } }); //если при создании пользователя не была указана роль то по дефолту это пользователь
      let roleId = role.id;
      const user = await User.create({
        name: name || "User",
        email: email,
        roleId: roleId,
        password: HASH_PASSWORD,
        isLocked: isLocked || false,
      });
      let token = this.generateJwt(
        user.id,
        user.email,
        user.role,
        user.isLocked
      );
      return token;
    } catch (e) {
      logger.error(e.message);
      throw new Error(ApiError.badRequest(e.message));
    }
  }
  async login(email, password) {
    try {
      let user = await User.findOne({ where: { email: email } });
      if (!user) {
        logger.error("Пользователь не найден");
        throw new Error(ApiError.internal("Пользователь не найден"));
      }
      let role = await Role.findOne({ where: { id: user.roleId } });
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        logger.error("Указан неверный пароль");
        throw new Error(ApiError.internal("Указан неверный пароль"));
      }
      const token = this.generateJwt(
        user.id,
        user.email,
        role.name,
        user.isLocked
      );
      return token;
    } catch (e) {
      logger.error(e.message);
      throw new Error(ApiError.badRequest(e.message));
    }
  }
  async updateElementByEmail(name, email, password, role, isLocked) {
    try {
      let value = await User.findOne({ where: { email: email } });
      if (!value) {
        logger.error("User is not exist");
        throw new Error(ApiError.badRequest("Value is not exist"));
      }
      let valueRole = await Role.findOne({ where: { name: role } });
      const HASH_PASSWORD = await bcrypt.hash(password, 5);
      await value.update({
        name: name,
        email: email,
        password: HASH_PASSWORD,
        role: valueRole.id,
        isLocked: isLocked,
      });
      await value.save().then(() => {
        logger.info("Value was added");
        return true;
      });
    } catch (e) {
      logger.error(e.message);
      throw new Error(ApiError.badRequest(e.message));
    }
  }
}
module.exports = new UserService();
