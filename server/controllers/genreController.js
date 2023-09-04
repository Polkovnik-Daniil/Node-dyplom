const { Genre } = require("../models/models");
const ApiError = require("../error/ApiError");
const logger = require("../logs/logger");

class GenreController {
  async getById(req, res, next) {
    try {
      let { id } = req.params;
      if (!id) {
        logger.error("Invalid value");
        return next(ApiError.badRequest("Invalid value"));
      }
      let genre = await Genre.findOne({ where: { id: id } });
      if (!genre) {
        logger.error("Value is not exist");
        return next(ApiError.notFound("Value is not exist"));
      }
      return res.json(genre);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getCountPages(req, res) {
    await Genre.count().then((countElements) => {
      return res.json(
        countElements % process.env.NUMBER_OF_TABLE_ELEMENTS === 0
          ? parseInt(countElements / process.env.NUMBER_OF_TABLE_ELEMENTS)
          : parseInt(countElements / process.env.NUMBER_OF_TABLE_ELEMENTS + 1)
      );
    });
  }

  async getPage(req, res, next) {
    try {
      let page = req.params.id;
      page = parseInt(page);
      if(!page){
        logger.error("Unccorrected value");
        return next(ApiError.badRequest("Unccorrected value"));
      }
      page = page === 0 ? 1 : page;
      let limit = process.env.NUMBER_OF_TABLE_ELEMENTS;
      let offset = page * limit - limit;
      await Genre.findAndCountAll({ limit, offset }).then((genrePage) => {
        if (!genrePage) {
          logger.error("Unccorrected value");
          return next(ApiError.badRequest("Unccorrected value"));
        }
        return res.json(genrePage);
      });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async createElement(req, res, next) {
    try {
      let { name } = req.body;
      if (!name) {
        logger.error("Invalid value");
        return next(next(ApiError.conflict("Invalid value")));
      }
      let value = await Genre.findOne({ where: { name: name } });
      if (value) {
        logger.error("Value already exist");
        return next(ApiError.conflict("Value already exist"));
      }
      await Genre.create({ name: name })
        .then(() => {
          logger.error("Value was added");
          return res.status(200).json({ message: "Ok" });
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
  //сделано так потому что мапперов в Node.js не было найдено
  //можно удалить элемент зная либо id, либо name жанра
  async deleteElementIncludeById(req, res, next) {
    try {
      let { id } = req.params;
      let { name } = req.body;
      let isValidData = (!id & name) || (id & !name);
      if (!isValidData) {
        logger.error("Unccorrected value");
        return next(ApiError.badRequest("Unccorrected value"));
      }
      //можно удалить объект зная или имя, или id
      let options = !id ? { where: { name: name } } : { where: { id: id } };
      let value = await Genre.findOne(options);
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
      let { nameBefore, nameAfter, id, name } = req.body;
      let isValidData =
        (nameBefore & nameAfter & !id & !name) ||
        (!nameBefore & !nameAfter & id & name);
      if (!isValidData) {
        logger.error("Unccorrected value");
        return next(ApiError.badRequest("Unccorrected value"));
      }
      //можно удалить объект зная два имени, или id и name
      let optionsForFindOne = !id & !name ? { where: { name: nameBefore } } : { where: { id: id } };
      let value = await Genre.findOne(optionsForFindOne);
      if (!value) {
        logger.error("Value is not exist");
        return next(ApiError.badRequest("Value is not exist"));
      }
      let optionsForUpdate = !id & !name ? { name: nameAfter } : { name: name };
      await value.update(optionsForUpdate);
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

module.exports = new GenreController();
