const { User } = require("../models/models");
const ApiError = require("../error/ApiError");
const logger = require("../logs/logger");
const UserService = require("../service/UserService");

class UserController {
  async registration(request, response, next) {
    let { name, email, role, password, isLocked } = request.body;
    let token = await UserService.registration(
      name,
      email,
      role,
      password,
      isLocked
    );
    return response.json({ token });
  }

  async login(request, response, next) {
    let { email, password } = request.body;
    let token = UserService.login(email, password);
    return response.json({ token });
  }

  async check(request, response, next) {
    const token = UserService.generateJwt(
      request.user.id,
      request.user.email,
      request.user.role
    );
    return response.json({ token });
  }

  async getById(request, response, next) {
    try {
      let { id } = request.params;
      let value = await StoreControllerService.getById(id, User);
      return response.json(value);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getCountPages(request, response) {
    try {
      let countElements = await StoreControllerService.getCountPages(User);
      return response.status(200).json({ count: countElements });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getPage(request, response, next) {
    try {
      let pageNumber = parseInt(request.params.id);
      let valuesPage = await StoreControllerService.getPage(pageNumber, User);
      return response.json(valuesPage);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteElementById(request, response, next) {
    try {
      let { id } = request.params;
      await StoreControllerService.deleteElementById(id, User);
      return response.status(200).json({ message: "Ok" });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async updateElementByEmail(request, response, next) {
    try {
      let { name, email, password, role, isLocked } = request.body;
      await UserService.updateElementById(
        id,
        name,
        email,
        password,
        role,
        isLocked
      );
      return response.status(200).json({ message: "Ok" });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new UserController();
