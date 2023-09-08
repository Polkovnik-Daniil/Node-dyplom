const { Genre } = require("../models/models");
const ApiError = require("../error/ApiError");
const StoreControllerService = require("../service/StoreControllerService");
const logger = require("../logs/logger");

class GenreController {
  async getById(request, response, next) {
    try {
      let { id } = request.params;
      let value = await StoreControllerService.getById(id, Genre);
      return response.json(value);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getCountPages(request, response) {
    try {
      let countElements = await StoreControllerService.getCountPages(Genre);
      return response.status(200).json({ count: countElements });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getPage(request, response, next) {
    try {
      let pageNumber = parseInt(request.params.id);
      let valuesPage = await StoreControllerService.getPage(pageNumber, Genre);
      return response.json(valuesPage);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async createElement(request, response, next) {
    try {
      let { name } = request.body;
      let optionForFindOne = {
        name: name,
        surname: surname,
        patrinymic: patrinymic,
      };
      let optionForCreate = {
        name: name,
        surname: surname,
        patrinymic: patrinymic,
      };
      await StoreControllerService.createElement(
        Genre,
        optionForFindOne,
        optionForCreate
      );
      return response.status(200).json({ message: "Ok" });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteElementById(request, response, next) {
    try {
      let { id } = request.params;
      await StoreControllerService.deleteElementById(id, Genre);
      return response.status(200).json({ message: "Ok" });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async updateElement(request, response, next) {
    try {
      let { id, name } = request.body;
      let optionForFindOne = { where: { id: id } };
      let optionForUpdate = {
        name: name,
      };
      await StoreControllerService.updateElement(
        optionForFindOne,
        optionForUpdate,
        Genre
      );
      return response.status(200).json({ message: "Ok" });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new GenreController();
