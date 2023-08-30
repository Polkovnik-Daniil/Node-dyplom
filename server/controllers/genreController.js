const { Genre } = require("../models/models");
const ApiError = require("../error/ApiError");

class GenreController {
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        next(ApiError.badRequest("Invalid value"));
      }
      const genre = await Genre.findOne({ where: { id: id } });
      return res.json(genre);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  //access-denied!
  async getAll(req, res) {
    const genre = await Genre.findAll();
    return res.json(genre);
  }

  async getCountPages(req, res) {
    //TODO : вместо числа 20 дать название переменной чтобы было поянтно что за число 20
    var countElements = await Genre.count();
    return res.json(
      countElements % process.env.NUMBER_OF_TABLE_ELEMENTS === 0
        ? parseInt(countElements / process.env.NUMBER_OF_TABLE_ELEMENTS)
        : parseInt(countElements / process.env.NUMBER_OF_TABLE_ELEMENTS + 1)
    );
  }

  async getPage(req, res, next) {
    try {
      let page = req.params.id;
      page = parseInt(page);
      page = page || 1;
      let limit = process.env.NUMBER_OF_TABLE_ELEMENTS;
      let offset = page * limit - limit;
      //TODO : дописать функцию возвращающую страницу
      let genres = await Genre.findAndCountAll({ limit, offset });
      return res.json(genres);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      let { name } = req.body;
      if (!name) {
        next(ApiError.conflict("Invalid value"));
      }
      const requested_value = await Genre.findOne({ where: { name: name } });
      if (requested_value) {
        return ApiError.conflict("Value already exist");
      }
      const genre = await Genre.create({ name: name });
      return res.json({ message: "Value was added" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  //протестировать
  async createArray(req, res, next) {
    try {
      let genres = req.body;
      if (!genres) {
        next(ApiError.conflict("Invalid value"));
      }
      genres = JSON.parse(genres);
      genres.forEach(async (element) => {
        const requested_value = await Genre.findOne({
          where: { name: element.name },
        });
        if (!requested_value) {
          Genre.create({ name: element.name });
        }
      });
      //TODO : пройти по всем элементам массива и проверить существуют ли добавляемые элементы в БД, если да то удалить их из списка, иначе оставить
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateElement(req, res, next) {
    try {
      let element_id = req.params.id;
      const requested_value = await Genre.findOne({
        where: { name: element.name },
      });
      if (!requested_value) {
        next(ApiError.badRequest("Value is not exist"));
      }
      return res.json({ message: "Value was added" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new GenreController();
