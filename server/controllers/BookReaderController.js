const { BookReader } = require("../models/models");
const ApiError = require("../error/ApiError");
const logger = require("../logs/logger");

class BookReaderController {
  async getById(request, response, next) {
    try {
      let { id } = request.params;
      if (!id) {
        logger.error("Invalid value");
        next(ApiError.badRequest("Invalid value"));
      }
      let value = await BookReader.findOne({ where: { id: id } });
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

  async getCountPages(request, response) {
    await BookReader.count().then((countElements) => {
      countElements =
        countElements % process.env.NUMBER_OF_TABLE_ELEMENTS === 0
          ? parseInt(countElements / process.env.NUMBER_OF_TABLE_ELEMENTS)
          : parseInt(countElements / process.env.NUMBER_OF_TABLE_ELEMENTS + 1);
      return response.json(countElements);
    });
  }

  async getPage(request, response, next) {
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
      await BookReader.findAndCountAll({ limit, offset }).then((valuesPage) => {
        if (!valuesPage) {
          logger.error("Unccorrected value");
          return next(ApiError.badRequest("Unccorrected value"));
        }
        return response.json(valuesPage);
      });
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
      let isValidData = bookId & genreId;
      if (!isValidData) {
        logger.error("Invalid value");
        return next(ApiError.conflict("Invalid value"));
      }
      let value = await BookReader.findOne({
        where: {
          bookId: bookId,
          readerId: readerId,
          userId: userId,
          dateOfIssueOfTheBook: dateOfIssueOfTheBook,
          dateOfBookAcceptance: dateOfBookAcceptance,
        },
      });
      if (value) {
        logger.error("Value already exist");
        return next(ApiError.conflict("Value already exist"));
      }
      await BookReader.create({
        bookId: bookId,
        readerId: readerId,
        userId: userId,
        dateOfIssueOfTheBook: dateOfIssueOfTheBook,
        dateOfBookAcceptance: dateOfBookAcceptance,
      })
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

  async deleteElementIncludeById(request, response, next) {
    try {
      let { id } = request.params;
      let {
        bookId,
        readerId,
        userId,
        dateOfIssueOfTheBook,
        dateOfBookAcceptance,
      } = request.body;
      let isValidData =
        bookId &
        readerId &
        userId &
        dateOfIssueOfTheBook &
        dateOfBookAcceptance;
      if (!isValidData) {
        logger.error("Invalid values");
        return next(ApiError.badRequest("Invalid values"));
      }
      let optionForFindOne = !id
        ? {
            where: {
              bookId: bookId,
              readerId: readerId,
              userId: userId,
              dateOfIssueOfTheBook: dateOfIssueOfTheBook,
              dateOfBookAcceptance: dateOfBookAcceptance,
            },
          }
        : { where: { id: id } };
      let value = await BookReader.findOne(optionForFindOne);
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
      let isValidData =
        id &
        bookId &
        readerId &
        userId &
        dateOfIssueOfTheBook &
        dateOfBookAcceptance;
      if (!isValidData) {
        logger.error("Invalid values");
        return next(ApiError.badRequest("Invalid values"));
      }
      let value = await BookReader.findOne({
        where: {
          id: id,
        },
      });
      if (!value) {
        logger.error("Value is not exist");
        return next(ApiError.badRequest("Value is not exist"));
      }
      await value.update({
        bookId: bookId,
        readerId: readerId,
        userId: userId,
        dateOfIssueOfTheBook: dateOfIssueOfTheBook,
        dateOfBookAcceptance: dateOfBookAcceptance,
      });
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

module.exports = new BookReaderController();
