const { BookReader } = require("../models/models");
const ApiError = require("../error/ApiError");
const logger = require("../logs/logger");
const StoreControllerService = require("../service/StoreControllerService");

class BookReaderController {
  async getById(request, response, next) {
    try {
      let { id } = request.params;
      let value = await StoreControllerService.getById(id, BookReader);
      return response.json(value);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getCountPages(request, response) {
    try {
      let countElements = await StoreControllerService.getCountPages(
        BookReader
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
        BookReader
      );
      return response.json(valuesPage);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async createElement(request, response, next) {
    try {
      let {
        bookId,
        readerId,
        userId,
        dateOfIssueOfTheBook,
        dateOfBookAcceptance,
      } = request.body;
      let optionForFindOne = {
        where: {
          bookId: bookId,
          readerId: readerId,
          userId: userId,
          dateOfIssueOfTheBook: dateOfIssueOfTheBook,
          dateOfBookAcceptance: dateOfBookAcceptance,
        },
      };
      let optionForCreate = {
        bookId: bookId,
        readerId: readerId,
        userId: userId,
        dateOfIssueOfTheBook: dateOfIssueOfTheBook,
        dateOfBookAcceptance: dateOfBookAcceptance,
      };
      await StoreControllerService.createElement(
        BookReader,
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
      await StoreControllerService.deleteElementById(id, BookReader);
      return response.status(200).json({ message: "Ok" });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async updateElement(request, response, next) {
    try {
      let {
        id,
        bookId,
        readerId,
        userId,
        dateOfIssueOfTheBook,
        dateOfBookAcceptance,
      } = request.body;
      let optionForFindOne = { where: { id: id } };
      let optionForUpdate = {
        bookId: bookId,
        readerId: readerId,
        userId: userId,
        dateOfIssueOfTheBook: dateOfIssueOfTheBook,
        dateOfBookAcceptance: dateOfBookAcceptance,
      };
      await StoreControllerService.updateElement(
        optionForFindOne,
        optionForUpdate,
        BookReader
      );
      return response.status(200).json({ message: "Ok" });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BookReaderController();
