const { Book } = require("../models/models");
const ApiError = require("../error/ApiError");
const logger = require("../logs/logger");
const StoreControllerService = require("../service/StoreControllerService");

class BookController {
  async getById(request, response, next) {
    try {
      let { id } = request.params;
      let value = await StoreControllerService.getById(id, Book);
      return response.json(value);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getCountPages(request, response) {
    try {
      let countElements = await StoreControllerService.getCountPages(Book);
      return response.status(200).json({ count: countElements });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getPage(request, response, next) {
    try {
      let pageNumber = parseInt(request.params.id);
      let valuesPage = await StoreControllerService.getPage(pageNumber, Book);
      return response.json(valuesPage);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async createElement(request, response, next) {
    try {
      let { title, releaseDate, numberOfBooks, numberOfPage } = request.body;
      let optionForFindOne = {
        where: {
          title: title,
          releaseDate: releaseDate,
          numberOfBooks: numberOfBooks,
          numberOfPage: numberOfPage,
        },
      };
      let optionForCreate = {
        title: title,
        releaseDate: releaseDate,
        numberOfBooks: numberOfBooks,
        numberOfPage: numberOfPage,
      };
      await StoreControllerService.createElement(
        Book,
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
      let { id, title, releaseDate, numberOfBooks, numberOfPage } = request.body;
      let optionForFindOne = { where: { id: id } };
      let optionForUpdate = {
        title: title,
        releaseDate: releaseDate,
        numberOfBooks: numberOfBooks,
        numberOfPage: numberOfPage,
      };
      await StoreControllerService.updateElement(
        optionForFindOne,
        optionForUpdate,
        Book
      );
      return response.status(200).json({ message: "Ok" });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BookController();
