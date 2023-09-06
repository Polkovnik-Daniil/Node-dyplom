const { Book } = require("../models/models");
const ApiError = require("../error/ApiError");

class BookController {
  async getById(req, res, next) {
    try {
      let { id } = req.params;
      if (!id) {
        logger.error(e.message);
        next(ApiError.badRequest("Invalid value"));
      }
      let value = await Book.findOne({ where: { id: id } });
      if (!value) {
        logger.error(e.message);
        return next(ApiError.notFound("Value is not exist"));
      }
      return res.json(value);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getCountPages(req, res) {
    await Book.count().then((countElements) => {
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
      await Book.findAndCountAll({ limit, offset }).then((valuesPage) => {
        if (!valuesPage) {
          logger.error(e.message);
          return next(ApiError.badRequest("Unccorrected value"));
        }
        return res.json(valuesPage);
      });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async createElement(req, res, next) {
    try {
      let { title, releaseDate, numberOfBooks, numberOfPage } = req.body;
      let isValidData = title & releaseDate & numberOfBooks & numberOfPage;
      if (!isValidData) {
        logger.error(e.message);
        return next(ApiError.conflict("Invalid value"));
      }
      let value = await Book.findOne({
        where: {
          title: title,
          releaseDate: releaseDate,
          numberOfBooks: numberOfBooks,
          numberOfPage: numberOfPage,
        },
      });
      if (value) {
        logger.error(e.message);
        return next(ApiError.conflict("Value already exist"));
      }
      await Book.create({
        title: title,
        releaseDate: releaseDate,
        numberOfBooks: numberOfBooks,
        numberOfPage: numberOfPage,
      })
        .then(() => {
          return res.status(200);
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

  async deleteElementIncludeById(req, res, next) {
    try {
      let { id } = req.params;
      let { title, releaseDate, numberOfBooks, numberOfPage } = req.body;
      let isValidData =
        title & releaseDate & numberOfBooks & numberOfPage & !id ||
        !title & !releaseDate & !numberOfBooks & !numberOfPage & id;
      if (!isValidData) {
        logger.error("Invalid values");
        return next(ApiError.badRequest("Invalid values"));
      }
      let optionForFindOne = !id
        ? {
            where: {
              title: title,
              releaseDate: releaseDate,
              numberOfBooks: numberOfBooks,
              numberOfPage: numberOfPage,
            },
          }
        : { where: { id: id } };
      let value = await Book.findOne(optionForFindOne);
      if (!value) {
        logger.error("Value already deleted");
        return next(ApiError.badRequest("Value already deleted"));
      }
      await value.destroy();
      await value.save().then(() => {
        return res.status(200).json({ message: "Ok" });
      });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async updateElement(req, res, next) {
    try {
      let { id, name, surname, patrinymic } = req.body;
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
        return res.status(200).json({ message: "Ok" });
      });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BookController();
