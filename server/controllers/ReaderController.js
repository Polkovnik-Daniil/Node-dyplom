const { Reader } = require("../models/models");
const ApiError = require("../error/ApiError");
const logger = require("../logs/logger");
const StoreControllerService = require("../service/StoreControllerService");

class ReaderController {
  async getById(request, response, next) {
    try {
      let { id } = request.params;
      let value = await StoreControllerService.getById(id, Reader);
      return response.json(value);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getCountPages(request, response) {
    try {
      let countElements = await StoreControllerService.getCountPages(Reader);
      return response.status(200).json({ count: countElements });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getPage(request, response, next) {
    try {
      let pageNumber = parseInt(request.params.id);
      let valuesPage = await StoreControllerService.getPage(pageNumber, Reader);
      return response.json(valuesPage);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async createElement(request, response, next) {
    try {
      let { name, surname, patrinymic, placeOfResidence, phoneNumber } =
        request.body;
      let optionForFindOne = {
        where: {
          name: name,
          surname: surname,
          patrinymic: patrinymic,
          placeOfResidence: placeOfResidence,
          phoneNumber: phoneNumber,
        },
      };
      let optionForCreate = {
        name: name,
        surname: surname,
        patrinymic: patrinymic,
        placeOfResidence: placeOfResidence,
        phoneNumber: phoneNumber,
      };
      await StoreControllerService.createElement(Reader, optionForFindOne, optionForCreate);
      return response.status(200).json({ message: "Ok" });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteElementById(request, response, next) {
    try {

      let { id } = request.params;
      await StoreControllerService.deleteElementById(id, Reader);
      return response.status(200).json({ message: "Ok" });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async updateElement(request, response, next) {
    try {
      let { id, name, surname, patrinymic, placeOfResidence, phoneNumber } =
        request.body;
      let optionForFindOne = { where: { id: id } };
      let optionForUpdate = {
        name: name,
        surname: surname,
        patrinymic: patrinymic,
        placeOfResidence: placeOfResidence,
        phoneNumber: phoneNumber,
      };
      await StoreControllerService.updateElement(
        optionForFindOne,
        optionForUpdate,
        Reader
      );
      return response.status(200).json({ message: "Ok" });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ReaderController();
