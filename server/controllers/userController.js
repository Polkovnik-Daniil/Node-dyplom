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
  //createElement
  async registration(req, res, next) {
    let { name, email, password, role, isLocked } = req.body;
    let isValidData = email & password;
    if (!isValidData) {
      logger.error("Некорректный email или password");
      return next(ApiError.badRequest("Некорректный email или password"));
    }
    let candidate = await User.findOne({ where: { email: email } });
    if (candidate) {
      logger.error("Пользователь с таким email уже существует");
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
    try {
      let { id } = req.params;
      if (!id) {
        logger.error("Invalid value");
        return next(ApiError.badRequest("Invalid value"));
      }
      let user = await User.findOne({ where: { id: id } });
      if (!user) {
        logger.error("Value is not exist");
        return next(ApiError.notFound("Value is not exist"));
      }
      return res.json(user);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getCountPages(req, res) {
    await User.count().then((countElements) => {
      countElements =
        countElements % process.env.NUMBER_OF_TABLE_ELEMENTS === 0
          ? parseInt(countElements / process.env.NUMBER_OF_TABLE_ELEMENTS)
          : parseInt(countElements / process.env.NUMBER_OF_TABLE_ELEMENTS + 1);
      return res.json(countElements);
    });
  }

  async getPage(req, res, next) {
    try {
      let page = req.params.id;
      page = parseInt(page);
      if (!page) {
        logger.error("Unccorrected value");
        return next(ApiError.badRequest("Unccorrected value"));
      }
      page = page === 0 ? 1 : page;
      let limit = process.env.NUMBER_OF_TABLE_ELEMENTS;
      let offset = page * limit - limit;
      await User.findAndCountAll({ limit, offset }).then((userPage) => {
        if (!userPage) {
          logger.error("Unccorrected value");
          return next(ApiError.badRequest("Unccorrected value"));
        }
        return res.json(userPage);
      });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  //сделано так потому что мапперов в Node.js не было найдено
  //можно удалить элемент зная либо id, либо name жанра
  async deleteElementIncludeById(req, res, next) {
    try {
      let { id } = req.params;
      let { email } = req.body;
      let isValidData = !id & email || id & !email;
      if (!isValidData) {
        logger.error("Unccorrected value");
        return next(ApiError.badRequest("Unccorrected value"));
      }
      //можно удалить объект зная или имя, или id
      let optionsForFindOne = !id ? { where: { name: email } } : { where: { id: id } };
      let value = await Genre.findOne(optionsForFindOne);
      if (!value) {
        logger.error("Value already deleted");
        return next(ApiError.badRequest("Value already deleted"));
      }
      await value.destroy();
      await value.save().then(() => {
        logger.info("Value was added");
        return res.status(200).json({ message: "Ok" });
      });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
  //сделано так потому что мапперов в Node.js не было найдено
  //можно обновить элемент зная либо id c name, либо nameBefore с nameAfter жанра
  async updateElementIncludeById(req, res, next) {
    try {
      let { name, email, password, role, isLocked } = req.body;
      let isValidData = name & email & password & role & isLocked;
      if (!isValidData) {
        logger.error("Unccorrected value");
        return next(ApiError.badRequest("Unccorrected value"));
      }
      let value = await User.findOne({ where: { email: email } });
      if (!value) {
        logger.error("User is not exist");
        return next(ApiError.badRequest("Value is not exist"));
      }
      let valueRole = await Role.findOne({ where: { id: value.roleId } });
      await value.update({
        name: name,
        email: email,
        password: password,
        role: valueRole.id,
        isLocked: isLocked,
      });
      await value.save().then(() => {
        logger.info("Value was added");
        return res.status(200).json({ message: "Ok" });
      });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new UserController();
