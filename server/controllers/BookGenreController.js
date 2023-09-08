const { BookGenre } = require("../models/models");
const ApiError = require("../error/ApiError");
const logger = require("../logs/logger");
const StoreControllerService = require("../service/StoreControllerService");

class BookGenreController {
  async getById(request, response, next) {
    try {
      let { id } = request.params;
      let value = await StoreControllerService.getById(id, BookGenre);
      return response.json(value);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getCountPages(request, response, next) {
    try {
      let countElements = await StoreControllerService.getCountPages(BookGenre);
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
        BookGenre
      );
      return response.json(valuesPage);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async createElement(request, response, next) {
    try {
      let { bookId, genreId } = request.body;
      let optionForFindOne = {
        where: {
          bookId: bookId,
          genreId: genreId,
        },
      };
      let optionForCreate = {
        bookId: bookId,
        genreId: genreId,
      };
      await StoreControllerService.createElement(
        BookGenre,
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
      await StoreControllerService.deleteElementById(id, BookGenre);
      return response.status(200).json({ message: "Ok" });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async updateElement(request, response, next) {
    try {
      let { id, bookId, genreId } = request.body;
      let optionForFindOne = { where: { id: id } };
      let optionForUpdate = {
        bookId: bookId,
        genreId: genreId,
      };
      await StoreControllerService.updateElement(
        optionForFindOne,
        optionForUpdate,
        BookGenre
      );
      return response.status(200).json({ message: "Ok" });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BookGenreController();
