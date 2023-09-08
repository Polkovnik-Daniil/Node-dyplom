const Router = require("express");
const router = new Router();
const bookGenreController = require("../controllers/BookGenreController");
const { checkSchema } = require("express-validator");
const {
  AuthorizationMiddleware,
  CheckLockedMiddleware,
  CheckRoleMiddleware,
  LoggerMiddleware,
  CheckResultValidationData,
} = require("../middleware/middleware");
const validationId = require("../validation/ValidationId");
const validationGetPage = require("../validation/ValidationGetPage");
const bookGenreValidationCreateElement = require("../validation/book.genre/BookGenreValidationCreateElement");
const bookGenreValidationUpdateElement = require("../validation/book.genre/BookGenreValidationUpdateElement");


router.get(
  "/pages/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator, User"),
  CheckLockedMiddleware,
  bookGenreController.getCountPages
);

router.get(
  "/page/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator, User"),
  CheckLockedMiddleware,
  checkSchema(validationGetPage),
  CheckResultValidationData,
  bookGenreController.getPage
);
router.get(
  "/element/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(validationId),
  CheckResultValidationData,
  bookGenreController.getById
);
router.post(
  "/create/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(bookGenreValidationCreateElement),
  CheckResultValidationData,
  bookGenreController.createElement
);
router.put(
  "/update/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(bookGenreValidationUpdateElement),
  CheckResultValidationData,
  bookGenreController.updateElement
);
router.delete(
  "/delete/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(validationId),
  CheckResultValidationData,
  bookGenreController.deleteElementById
);

module.exports = router;
