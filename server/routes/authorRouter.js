const Router = require("express");
const router = new Router();
const authorController = require("../controllers/AuthorController");
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
const authorValidationCreateElement = require("../validation/author/AuthorValidationCreateElement");
const authorValidationUpdateElement = require("../validation/author/AuthorValidationUpdateElement");


router.get(
  "/pages/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  authorController.getCountPages
);

router.get(
  "/page/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(validationGetPage),
  CheckResultValidationData,
  authorController.getPage
);
router.get(
  "/element/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(validationId),
  CheckResultValidationData,
  authorController.getById
);
router.post(
  "/create/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(authorValidationCreateElement),
  CheckResultValidationData,
  authorController.createElement
);
router.put(
  "/update/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(authorValidationUpdateElement),
  CheckResultValidationData,
  authorController.updateElement
);
router.delete(
  "/delete/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(validationId),
  CheckResultValidationData,
  authorController.deleteElementById
);

module.exports = router;
