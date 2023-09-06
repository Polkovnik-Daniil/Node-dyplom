const ApiError = require("../error/ApiError");
const logger = require("../logs/logger");

class StoreControllerService {
  async getById(request, response, next, model) {
    try {
      let { id } = request.params;
      if (!id) {
        logger.error("Invalid value");
        next(ApiError.badRequest("Invalid value"));
      }
      let value = await model.findOne({ where: { id: id } });
      if (!value) {
        logger.error("Value is not exist");
        return next(ApiError.notFound("Value is not exist"));
      }
      return response.json(value);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getCountPages(request, response, next, model) {
    await model
      .count()
      .then((countElements) => {
        countElements =
          countElements % process.env.NUMBER_OF_TABLE_ELEMENTS === 0
            ? parseInt(countElements / process.env.NUMBER_OF_TABLE_ELEMENTS)
            : parseInt(
                countElements / process.env.NUMBER_OF_TABLE_ELEMENTS + 1
              );
        return response.json(countElements);
      })
      .catch((e) => {
        logger.error(e.message);
        next(ApiError.badRequest(e.message));
      });
  }

  async getPage(request, response, next, model) {
    try {
      let page = request.params.id;
      page = parseInt(page);
      if (!page) {
        logger.error("Unccorrected value");
        return next(ApiError.badRequest("Unccorrected value"));
      }
      page = page === 0 ? 1 : page;
      let limit = process.env.NUMBER_OF_TABLE_ELEMENTS;
      let offset = page * limit - limit;
      await model.findAndCountAll({ limit, offset }).then((modelPage) => {
        if (!modelPage) {
          logger.error("Unccorrected value");
          return next(ApiError.badRequest("Unccorrected value"));
        }
        return response.json(modelPage);
      });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async createElement(
    request,
    response,
    next,
    model,
    isValidData,
    optionForFindOne,
    optionsForCreate
  ) {
    try {
      if (!isValidData) {
        logger.error("Invalid value");
        return next(ApiError.conflict("Invalid value"));
      }
      let value = await model.findOne(optionForFindOne);
      if (value) {
        logger.error("Value already exist");
        return next(ApiError.conflict("Value already exist"));
      }
      await model
        .create(optionsForCreate)
        .then(() => {
          return response.status(200);
        })
        .catch((e) => {
          logger.error(e.message);
          next(ApiError.conflict("Value already exist"));
        });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteElementIncludeById(
    request,
    response,
    next,
    model,
    isValidData,
    optionForFindOne
  ) {
    try {
      if (!isValidData) {
        logger.error("Invalid values");
        return next(ApiError.badRequest("Invalid values"));
      }
      let value = await model.findOne(optionForFindOne);
      if (!value) {
        logger.error("Value already deleted");
        return next(ApiError.badRequest("Value already deleted"));
      }
      await value.destroy();
      await value.save().then(() => {
        return response.status(200).json({ message: "Ok" });
      });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async updateElement(
    request,
    response,
    next,
    model,
    isValidData,
    optionForFindOne,
    optionForUpdate
  ) {
    try {
      if (!isValidData) {
        logger.error("Invalid values");
        return next(ApiError.badRequest("Invalid values"));
      }
      let value = await model.findOne(optionForFindOne);
      if (!value) {
        logger.error("Value is not exist");
        return next(ApiError.badRequest("Value is not exist"));
      }
      await value.update(optionForUpdate);
      await value.save().then(() => {
        logger.info("Value was added!");
        return response.status(200).json({ message: "Ok" });
      });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new StoreControllerService();
