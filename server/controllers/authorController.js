const { Author } = require("../models/models");
const ApiError = require("../error/ApiError");

class AuthorController {
  async getById(req, res, next) {
    try {
      let { id } = req.params;
      if (!id) {
        logger.error(e.message);
        next(ApiError.badRequest("Invalid value"));
      }
      let author = await Author.findOne({ where: { id: id } });
      if (!author) {
        logger.error(e.message);
        return next(ApiError.notFound("Value is not exist"));
      }
      return res.json(genre);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getCountPages(req, res) {
    await Author.count().then((countElements) => {
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
      if (!page) {
        logger.error("Unccorrected value");
        return next(ApiError.badRequest("Unccorrected value"));
      }
      page = page === 0 ? 1 : page;
      let limit = process.env.NUMBER_OF_TABLE_ELEMENTS;
      let offset = page * limit - limit;
      await Author.findAndCountAll({ limit, offset }).then((authorPage) => {
        if (!authorPage) {
          logger.error(e.message);
          return next(ApiError.badRequest("Unccorrected value"));
        }
        return res.json(authorPage);
      });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async createElement(req, res, next) {
    try {
      let { name, surname, patrinymic } = req.body;
      let isValidData = name & surname & patrinymic;
      if (!isValidData) {
        logger.error(e.message);
        return next(ApiError.conflict("Invalid value"));
      }
      let value = await Author.findOne({
        where: { name: name, surname: surname, patrinymic: patrinymic },
      });
      if (value) {
        logger.error(e.message);
        return next(ApiError.conflict("Value already exist"));
      }
      await Author.create({
        name: name,
        surname: surname,
        patrinymic: patrinymic,
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
      let { name, surname, patrinymic } = req.body;
      let isValidData =
        name & surname & patrinymic & !id ||
        !name & !surname & !patrinymic & id;
      if (!isValidData) {
        logger.error(e.message);
        return next(ApiError.badRequest("Invalid values"));
      }
      let value = await Author.findOne({
        where: { name: name, surname: surname, patrinymic: patrinymic },
      });
      if (!value) {
        logger.error(e.message);
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
      let {
        id,
        name,
        surname,
        patrinymic,
        nameBefore,
        nameAfter,
        surnameBefore,
        surnameAfter,
        patrinymicBefore,
        patrinymicAfter,
      } = req.body;
      let isValidData =
        id &
          name &
          surname &
          patrinymic &
          !nameBefore &
          !nameAfter &
          !surnameBefore &
          !surnameAfter &
          !patrinymicBefore &
          !patrinymicAfter ||
        !id &
          !name &
          !surname &
          !patrinymic &
          nameBefore &
          nameAfter &
          surnameBefore &
          surnameAfter &
          patrinymicBefore &
          patrinymicAfter;
      let value = await Author.findOne({
        where: {
          name: nameBefore,
          surname: surnameBefore,
          patrinymic: patrinymicBefore,
        },
      });
      if (!value) {
        logger.error(e.message);
        return next(ApiError.badRequest("Value is not exist"));
      }
      await value.update({
        name: nameAfter,
        surname: surnameAfter,
        patrinymic: patrinymicAfter,
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

module.exports = new AuthorController();
