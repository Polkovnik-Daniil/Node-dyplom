const Router = require("express");
const router = new Router();
const authorController = require("../controllers/AuthorController");
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
  authorController.getCountPages
);
router.get(
  "/page/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  authorController.getPage
);
router.get(
  "/element/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  authorController.getById
);
router.post(
  "/create/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  authorController.createElement
);
router.put(
  "/update/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  authorController.updateElement
);
router.delete(
  "/delete/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  authorController.deleteElementIncludeById
);

module.exports = router;
