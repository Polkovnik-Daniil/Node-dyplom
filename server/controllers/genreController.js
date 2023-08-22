const { Genre } = require("../models/models");
const ApiError = require("../error/ApiError");

class GenreController {
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        next(ApiError.badRequest("Invalid value"));
      }
      const genre = await Genre.findOne({ where: { id } });
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
    var number_of_table_elements = 20;
    return res.json(
      countElements % number_of_table_elements === 0
        ? parseInt(countElements / number_of_table_elements)
        : parseInt(countElements / number_of_table_elements + 1)
    );
  }

  async getPage(req, res) {
    let { page } = req.params;
    page = page || 1;
    var number_of_table_elements = 20;
    //TODO : дописать функцию возвращающую страницу
    const genre = await Genre.findAll();
    return res.json(genre);
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

  async createArray(req, res, next) {
    try {
      let { genres } = req.body;
      if (!genres) {
        next(ApiError.conflict("Invalid value"));
      }
      //TODO : пройти по всем элементам массива и проверить существуют ли добавляемые элементы в БД, если да то удалить их из списка, иначе оставить
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new GenreController();
