const ApiError = require("../error/ApiError");
const logger = require("../logs/logger");

class StoreControllerService {
  async getById(id, model) {
    try {
      let value = await model.findOne({ where: { id: id } });
      if (!value) {
        logger.error("Value is not exist");
        throw new Error(ApiError.notFound("Value is not exist"));
      }
      return value;
    } catch (e) {
      logger.error(e.message);
      throw new Error(ApiError.badRequest(e.message));
    }
  }

  async getCountPages(model) {
    let countElements = await model
      .count()
      .then((countElements) => {
        countElements =
          countElements % process.env.NUMBER_OF_TABLE_ELEMENTS === 0
            ? parseInt(countElements / process.env.NUMBER_OF_TABLE_ELEMENTS)
            : parseInt(
                countElements / process.env.NUMBER_OF_TABLE_ELEMENTS + 1
              );
        return countElements;
      })
      .catch((e) => {
        logger.error(e.message);
        throw new Error(ApiError.badRequest(e.message));
      });
    return countElements;
  }

  async getPage(page, model) {
    try {
      let limit = process.env.NUMBER_OF_TABLE_ELEMENTS;
      let offset = page * limit - limit;
      let modelPage = await model
        .findAndCountAll({ limit, offset })
        .then((modelPage) => {
          if (!modelPage) {
            logger.error("Unccorrected value");
            throw new Error(ApiError.badRequest("Unccorrected value"));
          }
          return modelPage;
        });
      return modelPage;
    } catch (e) {
      logger.error(e.message);
      throw new Error(ApiError.badRequest(e.message));
    }
  }

  async createElement(model, optionForFindOne, optionForCreate) {
    try {
      let value = await model.findOne(optionForFindOne);
      if (value) {
        logger.error("Value already exist");
        throw new Error(ApiError.conflict("Value already exist"));
      }
      await model
        .create(optionForCreate)
        .then((result) => {
          return result;
        })
        .catch((e) => {
          logger.error(e.message);
          throw new Error(ApiError.conflict("Value already exist"));
        });
        return true;
    } catch (e) {
      logger.error(e.message);
      throw new Error(ApiError.badRequest(e.message));
    }
  }

  async deleteElementById(id, model) {
    try {
      let value = await model.findOne({ where: { id: id } });
      if (!value) {
        logger.error("Value already deleted");
        throw new Error(ApiError.badRequest("Value already deleted"));
      }
      await value.destroy();
      await value.save().then(() => {
        return response.status(200).json({ message: "Ok" });
      });
      return true;
    } catch (e) {
      logger.error(e.message);
      throw new Error(ApiError.badRequest(e.message));
    }
  }

  async updateElement(optionForFindOne, optionForUpdate, model) {
    try {
      let value = await model.findOne(optionForFindOne);
      if (!value) {
        logger.error("Value is not exist");
        throw new Error(ApiError.badRequest("Value is not exist"));
      }
      await value.update(optionForUpdate);
      await value.save().then(() => {
        logger.info("Value was added!");
        return response.status(200).json({ message: "Ok" });
      });
      return true;
    } catch (e) {
      logger.error(e.message);
      throw new Error(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new StoreControllerService();
