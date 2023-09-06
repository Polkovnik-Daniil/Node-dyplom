const Router = require("express");
const router = new Router();
const userController = require("../controllers/UserController");
const {
  AuthorizationMiddleware,
  CheckLockedMiddleware,
  CheckRoleMiddleware,
  LoggerMiddleware,
} = require("../middleware/middleware");

router.post("/registration", userController.registration);
router.post("/create", userController.registration);
router.post("/login", userController.login);
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
  userController.getById
);
router.get(
  "/element/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
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
  userController.getPage
);
router.get(
  "/update/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  userController.updateElementIncludeById
);
router.get(
  "/delete/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  userController.deleteElementIncludeById
);

module.exports = router;
