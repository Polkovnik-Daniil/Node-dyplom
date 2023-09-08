const { Author } = require("../models/models");
const ApiError = require("../error/ApiError");
const StoreControllerService = require("../service/StoreControllerService");
const logger = require("../logs/logger");

class AuthorController {
  async getById(request, response, next) {
    try {
      let { id } = request.params;
      let value = await StoreControllerService.getById(id, Author);
      return response.json(value);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getCountPages(request, response, next) {
    try {
      let countElements = await StoreControllerService.getCountPages(Author);
      return response.status(200).json({ count: countElements });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getPage(request, response, next) {
    try {
      let pageNumber = parseInt(request.params.id);
      let valuesPage = await StoreControllerService.getPage(pageNumber, Author);
      return response.json(valuesPage);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async createElement(request, response, next) {
    try {
      let { name, surname, patrinymic } = request.body;
      let optionForFindOne = {
        where: { name: name, surname: surname, patrinymic: patrinymic },
      };
      let optionForCreate = {
        name: name,
        surname: surname,
        patrinymic: patrinymic,
      };
      await StoreControllerService.createElement(
        Author,
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
      await StoreControllerService.deleteElementById(id, Author);
      return response.status(200).json({ message: "Ok" });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async updateElement(request, response, next) {
    try {
      let { id, name, surname, patrinymic } = request.body;
      let optionForFindOne = { where: { id: id } };
      let optionForUpdate = {
        name: name,
        surname: surname,
        patrinymic: patrinymic,
      };
      await StoreControllerService.updateElement(
        optionForFindOne,
        optionForUpdate,
        Author
      );
      return response.status(200).json({ message: "Ok" });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new AuthorController();
