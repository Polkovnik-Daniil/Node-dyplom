const Router = require("express");
const router = new Router();
const userController = require("../controllers/UserController");
const {
  AuthorizationMiddleware,
  CheckLockedMiddleware,
  CheckRoleMiddleware,
  LoggerMiddleware,
  CheckResultValidationData
} = require("../middleware/middleware");
const { checkSchema } = require("express-validator");
const validationId = require("../validation/ValidationId");
const validationGetPage = require("../validation/ValidationGetPage");
const userValidationLogin = require("../validation/user/UserValidationLogin");
const userValidationCreateElement = require("../validation/user/UserValidationCreateElement");
const userValidationUpdateElement = require("../validation/user/UserValidationUpdateElement");

router.post(
  "/registration",
  LoggerMiddleware,
  checkSchema(userValidationCreateElement),
  CheckResultValidationData,
  userController.registration
);
router.post(
  "/login",
  LoggerMiddleware,
  checkSchema(userValidationLogin),
  CheckResultValidationData,
  userController.login
);
router.get(
  "/auth",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckLockedMiddleware,
  userController.check
);
router.get(
  "/element/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(validationId),
  CheckResultValidationData,
  userController.getById
);
router.get(
  "/pages/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  userController.getCountPages
);
router.get(
  "/page/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(validationGetPage),
  CheckResultValidationData,
  userController.getPage
);
router.get(
  "/update/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(userValidationUpdateElement),
  CheckResultValidationData,
  userController.updateElementByEmail
);
router.get(
  "/delete/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  checkSchema(validationId),
  CheckResultValidationData,
  userController.deleteElementById
);

module.exports = router;
