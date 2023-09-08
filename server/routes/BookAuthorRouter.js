const Router = require("express");
const router = new Router();
const bookAuthorController = require("../controllers/BookAuthorController");
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
const bookAuthorValidationCreateElement = require("../validation/book.author/BookAuthorValidationCreateElement");
const bookAuthorValidationUpdateElement = require("../validation/book.author/BookAuthorValidationUpdateElement");


router.get(
  "/pages/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  bookAuthorController.getCountPages
);

router.get(
  "/page/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(validationGetPage),
  CheckResultValidationData,
  bookAuthorController.getPage
);
router.get(
  "/element/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(validationId),
  CheckResultValidationData,
  bookAuthorController.getById
);
router.post(
  "/create/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(bookAuthorValidationCreateElement),
  CheckResultValidationData,
  bookAuthorController.createElement
);
router.put(
  "/update/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(bookAuthorValidationUpdateElement),
  CheckResultValidationData,
  bookAuthorController.updateElement
);
router.delete(
  "/delete/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(validationId),
  CheckResultValidationData,
  bookAuthorController.deleteElementById
);

module.exports = router;
