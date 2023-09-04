const { User, Role } = require("../models/models");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../logs/logger");

const generateJwt = (id, email, role, isLocked) => {
  return jwt.sign({ id, email, role, isLocked }, process.env.SECRET_KEY, {
    expiresIn: "96h",
  });
};

class UserController {
  async registration(req, res, next) {
    let { name, email, password, role, isLocked } = req.body;
    let isValidData = email & password;
    if (!isValidData) {
      logger.error("Некорректный email или password");
      return next(ApiError.badRequest("Некорректный email или password"));
    }
    let candidate = await User.findOne({ where: { email: email } });
    if (candidate) {
      logger.error(e.message);
      return next(
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
    let token = generateJwt(user.id, user.email, user.role, user.isLocked);
    return res.json({ token });
  }

  async login(req, res, next) {
    let { email, password } = req.body;
    let user = await User.findOne({ where: { email } });
    if (!user) {
      logger.error("Пользователь не найден");
      return next(ApiError.internal("Пользователь не найден"));
    }
    let role = await Role.findOne({ where: { id: user.roleId } });
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      logger.error("Указан неверный пароль");
      return next(ApiError.internal("Указан неверный пароль"));
    }
    const token = generateJwt(user.id, user.email, role.name, user.isLocked);
    return res.json({ token });
  }

  async check(req, res, next) {
    //не нужен обработчик т.к. после обработки middleware данные req.user уже будут
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }

  async getById(req, res, next) {
    let { id } = req.params;
    let isValidData = id === null;
    if (!isValidData) {
      logger.error("");
    }
  }
}

module.exports = new UserController();
