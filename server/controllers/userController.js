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
  async registration(request, response, next) {
    let { name, email, password, role, isLocked } = request.body;
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
    return response.json({ token });
  }

  async login(request, response, next) {
    let { email, password } = request.body;
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
    return response.json({ token });
  }

  async check(request, response, next) {
    //не нужен обработчик т.к. после обработки middleware данные req.user уже будут
    const token = generateJwt(request.user.id, request.user.email, request.user.role);
    return response.json({ token });
  }

  async getById(request, response, next) {
    try {
      let { id } = request.params;
      if (!id) {
        logger.error("Invalid value");
        return next(ApiError.badRequest("Invalid value"));
      }
      let user = await User.findOne({ where: { id: id } });
      if (!user) {
        logger.error("Value is not exist");
        return next(ApiError.notFound("Value is not exist"));
      }
      return response.json(user);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getCountPages(request, response) {
    await User.count().then((countElements) => {
      countElements =
        countElements % process.env.NUMBER_OF_TABLE_ELEMENTS === 0
          ? parseInt(countElements / process.env.NUMBER_OF_TABLE_ELEMENTS)
          : parseInt(countElements / process.env.NUMBER_OF_TABLE_ELEMENTS + 1);
      return response.json(countElements);
    });
  }

  async getPage(request, response, next) {
    try {
      let page = request.params.id;
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
        return response.json(userPage);
      });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  //сделано так потому что мапперов в Node.js не было найдено
  //можно удалить элемент зная либо id, либо name жанра
  async deleteElementIncludeById(request, response, next) {
    try {
      let { id } = request.params;
      let { email } = request.body;
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
        return response.status(200).json({ message: "Ok" });
      });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
  //сделано так потому что мапперов в Node.js не было найдено
  //можно обновить элемент зная либо id c name, либо nameBefore с nameAfter жанра
  async updateElementIncludeById(request, response, next) {
    try {
      let { name, email, password, role, isLocked } = request.body;
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
        return response.status(200).json({ message: "Ok" });
      });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new UserController();
