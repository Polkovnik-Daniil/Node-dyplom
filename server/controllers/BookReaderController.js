const { BookReader } = require("../models/models");
const ApiError = require("../error/ApiError");

class BookReaderController {
  async getById(req, res, next) {
    try {
      let { id } = req.params;
      if (!id) {
        logger.error("Invalid value");
        next(ApiError.badRequest("Invalid value"));
      }
      let value = await BookReader.findOne({ where: { id: id } });
      if (!value) {
        logger.error("Value is not exist");
        return next(ApiError.notFound("Value is not exist"));
      }
      return res.json(value);
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async getCountPages(req, res) {
    await BookReader.count().then((countElements) => {
      countElements =
        countElements % process.env.NUMBER_OF_TABLE_ELEMENTS === 0
          ? parseInt(countElements / process.env.NUMBER_OF_TABLE_ELEMENTS)
          : parseInt(countElements / process.env.NUMBER_OF_TABLE_ELEMENTS + 1);
      return res.json(countElements);
    });
  }

  async getPage(req, res, next) {
    try {
      let page = req.params.id;
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
        return res.json(valuesPage);
      });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async createElement(req, res, next) {
    try {
      let {
        bookId,
        readerId,
        userId,
        dateOfIssueOfTheBook,
        dateOfBookAcceptance,
      } = req.body;
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
          return res.status(200);
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

  async deleteElementIncludeById(req, res, next) {
    try {
      let { id } = req.params;
      let {
        bookId,
        readerId,
        userId,
        dateOfIssueOfTheBook,
        dateOfBookAcceptance,
      } = req.body;
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
        return res.status(200).json({ message: "Ok" });
      });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }

  async updateElement(req, res, next) {
    try {
      let {
        id,
        bookId,
        readerId,
        userId,
        dateOfIssueOfTheBook,
        dateOfBookAcceptance,
      } = req.body;
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
        return res.status(200).json({ message: "Ok" });
      });
    } catch (e) {
      logger.error(e.message);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BookReaderController();
