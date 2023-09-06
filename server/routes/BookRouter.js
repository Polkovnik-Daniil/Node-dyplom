const Router = require("express");
const router = new Router();
const bookController = require("../controllers/BookController");
const {
  AuthorizationMiddleware,
  CheckLockedMiddleware,
  CheckRoleMiddleware,
  LoggerMiddleware,
} = require("../middleware/middleware");
router.get(
  "/pages/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  bookController.getCountPages
);
router.get(
  "/page/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  bookController.getPage
);
router.get(
  "/element/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  bookController.getById
);
router.post(
  "/create/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  bookController.createElement
);
router.put(
  "/update/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  bookController.updateElement
);
router.delete(
  "/delete/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  bookController.deleteElementIncludeById
);

module.exports = router;
