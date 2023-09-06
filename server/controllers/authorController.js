const { Author } = require("../models/models");
const ApiError = require("../error/ApiError");
const StoreControllerService = require("../service/StoreControllerService");

class AuthorController {
  async getById(request, response, next) {
    try {
      let { id } = request.params;
      if (!id) {
        logger.error("Invalid value");
        next(ApiError.badRequest("Invalid value"));
      }
      let value = await Author.findOne({ where: { id: id } });
      if (!value) {
        logger.error("Value is not exist");
        return next(ApiError.notFound("Value is not exist"));
      }
      return response.json(value);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getCountPages(request, response, next) {
    await Author.count().then((countElements) => {
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
      await Author.findAndCountAll({ limit, offset }).then((authorPage) => {
        if (!authorPage) {
          logger.error("Unccorrected value");
          return next(ApiError.badRequest("Unccorrected value"));
        }
        return response.json(authorPage);
      });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async createElement(request, response, next) {
    try {
      let { name, surname, patrinymic } = request.body;
      let isValidData = name & surname & patrinymic;
      if (!isValidData) {
        logger.error("Invalid value");
        return next(ApiError.conflict("Invalid value"));
      }
      let value = await Author.findOne({
        where: { name: name, surname: surname, patrinymic: patrinymic },
      });
      if (value) {
        logger.error("Value already exist");
        return next(ApiError.conflict("Value already exist"));
      }
      await Author.create({
        name: name,
        surname: surname,
        patrinymic: patrinymic,
      })
        .then(() => {
          return response.status(200);
        })
        .catch((e) => {
          logger.error(e.message);
          next(ApiError.conflict("Value already exist"));
        });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteElementIncludeById(request, response, next) {
    try {
      let { id } = request.params;
      let { name, surname, patrinymic } = request.body;
      let isValidData =
        name & surname & patrinymic & !id ||
        !name & !surname & !patrinymic & id;
      if (!isValidData) {
        logger.error("Invalid values");
        return next(ApiError.badRequest("Invalid values"));
      }
      let optionForFindOne = !id
        ? { where: { name: name, surname: surname, patrinymic: patrinymic } }
        : { where: { id: id } };
      let value = await Author.findOne(optionForFindOne);
      if (!value) {
        logger.error("Value already deleted");
        return next(ApiError.badRequest("Value already deleted"));
      }
      await value.destroy();
      await value.save().then(() => {
        return response.status(200).json({ message: "Ok" });
      });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async updateElement(request, response, next) {
    try {
      let { id, name, surname, patrinymic } = request.body;
      let isValidData = id & name & surname & patrinymic;
      if (!isValidData) {
        logger.error("Invalid values");
        return next(ApiError.badRequest("Invalid values"));
      }
      let value = await Author.findOne({
        where: {
          id: id,
        },
      });
      if (!value) {
        logger.error("Value is not exist");
        return next(ApiError.badRequest("Value is not exist"));
      }
      await value.update({
        name: name,
        surname: surname,
        patrinymic: patrinymic,
      });
      await value.save().then(() => {
        logger.info("Value was added!");
        return response.status(200).json({ message: "Ok" });
      });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new AuthorController();
