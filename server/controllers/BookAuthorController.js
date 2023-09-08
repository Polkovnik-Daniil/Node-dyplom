const { BookAuthor } = require("../models/models");
const ApiError = require("../error/ApiError");
const logger = require("../logs/logger");
const StoreControllerService = require("../service/StoreControllerService");

class BookAuthorController {
  async getById(request, response, next) {
    try {
      let { id } = request.params;
      let value = await StoreControllerService.getById(id, BookAuthor);
      return response.json(value);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getCountPages(request, response) {
    try {
      let countElements = await StoreControllerService.getCountPages(
        BookAuthor
      );
      return response.status(200).json({ count: countElements });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getPage(request, response, next) {
    try {
      let pageNumber = parseInt(request.params.id);
      let valuesPage = await StoreControllerService.getPage(
        pageNumber,
        BookAuthor
      );
      return response.json(valuesPage);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async createElement(request, response, next) {
    try {
      let { bookId, authorId } = request.body;
      let optionForFindOne = {
        where: { bookId: bookId, authorId: authorId },
      };
      let optionForCreate = {
        bookId: bookId,
        authorId: authorId,
      };
      await StoreControllerService.createElement(
        BookAuthor,
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
      await StoreControllerService.deleteElementById(id, BookAuthor);
      return response.status(200).json({ message: "Ok" });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async updateElement(request, response, next) {
    try {
      let { id, bookId, authorId } = request.body;
      let optionForFindOne = { where: { id: id } };
      let optionForUpdate = {
        bookId: bookId,
        authorId: authorId,
      };
      await StoreControllerService.updateElement(
        optionForFindOne,
        optionForUpdate,
        BookAuthor
      );
      return response.status(200).json({ message: "Ok" });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BookAuthorController();
