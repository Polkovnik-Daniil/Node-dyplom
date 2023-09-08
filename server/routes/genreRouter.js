const Router = require("express");
const router = new Router();
const genreController = require("../controllers/GenreController");
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
const genreValidationCreateElement = require("../validation/genre/GenreValidationCreateElement");
const genreValidationUpdateElement = require("../validation/genre/GenreValidationUpdateElement");



router.get(
  "/pages/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  genreController.getCountPages
);
router.get(
  "/page/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(validationGetPage),
  CheckResultValidationData,
  genreController.getPage
);
router.get(
  "/element/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(validationId),
  CheckResultValidationData,
  genreController.getById
);
router.post(
  "/create/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(genreValidationCreateElement),
  CheckResultValidationData,
  genreController.createElement
);
router.put(
  "/update/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(genreValidationUpdateElement),
  CheckResultValidationData,
  genreController.updateElement
);
router.delete(
  "/delete/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(validationId),
  CheckResultValidationData,
  genreController.deleteElementById
);

module.exports = router;
