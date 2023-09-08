const Router = require("express");
const router = new Router();
const readerController = require("../controllers/ReaderController");
const {
  AuthorizationMiddleware,
  CheckLockedMiddleware,
  CheckRoleMiddleware,
  LoggerMiddleware,
  CheckResultValidationData,
} = require("../middleware/middleware");
const validationId = require("../validation/ValidationId");
const validationGetPage = require("../validation/ValidationGetPage");
const readerValidationCreateElement = require("../validation/reader/ReaderValidationCreateElement");
const readerValidationUpdateElement = require("../validation/reader/ReaderValidationUpdateElement");
const { checkSchema } = require("express-validator");

router.get(
  "/pages/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  readerController.getCountPages
);
router.get(
  "/page/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(validationGetPage),
  CheckResultValidationData,
  readerController.getPage
);
router.get(
  "/element/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(validationId),
  CheckResultValidationData,
  readerController.getById
);
router.post(
  "/create/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(readerValidationCreateElement),
  CheckResultValidationData,
  readerController.createElement
);
router.put(
  "/update/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(readerValidationUpdateElement),
  CheckResultValidationData,
  readerController.updateElement
);
router.delete(
  "/delete/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(validationId),
  CheckResultValidationData,
  readerController.deleteElementById
);

module.exports = router;
