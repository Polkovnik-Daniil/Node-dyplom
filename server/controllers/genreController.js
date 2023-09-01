const { Genre } = require("../models/models");
const ApiError = require("../error/ApiError");

class GenreController {
  async getById(req, res, next) {
    try {
      let { id } = req.params;
      if (!id) {
        next(ApiError.badRequest("Invalid value"));
      }
      let genre = await Genre.findOne({ where: { id: id } });
      if (!genre) {
        throw new Error(ApiError.notFound("Value is not exist"));
      }
      return res.json(genre);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getCountPages(req, res) {
    //TODO : вместо числа 20 дать название переменной чтобы было поянтно что за число 20
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
      page = page || 1;
      let limit = process.env.NUMBER_OF_TABLE_ELEMENTS;
      let offset = page * limit - limit;
      await Genre.findAndCountAll({ limit, offset }).then((genrePage) => {
        if (!genrePage) {
          throw new Error(ApiError.badRequest("Unccorrected value"));
        }
        return res.json(genrePage);
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async createElement(req, res, next) {
    try {
      let { name } = req.body;
      if (!name) {
        throw new Error(next(ApiError.conflict("Invalid value")));
      }
      let value = await Genre.findOne({ where: { name: name } });
      if (value) {
        throw new Error(ApiError.conflict("Value already exist"));
      }
      await Genre.create({ name: name })
        .then(() => {
          return res.status(200);
        })
        .catch((e) => {
          throw new Error(ApiError.conflict("Value already exist"));
        });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteElement(req, res, next) {
    try {
      let { name } = req.body;
      let value = await Genre.findOne({
        where: { name: name },
      });
      if (!value) {
        throw new Error(ApiError.badRequest("Value already deleted"));
      }
      await value.destroy();
      await value.save().then(() => {
        return res.status(200).json({ message: "Ok" });
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateElement(req, res, next) {
    try {
      let { nameBefore, nameAfter } = req.body;
      let value = await Genre.findOne({
        where: { name: nameBefore },
      });
      if (!value) {
        throw new Error(ApiError.badRequest("Value is not exist"));
      }
      await value.update({ name: nameAfter });
      await value.save().then(() => {
        return res.status(200).json({ message: "Ok" });
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new GenreController();
