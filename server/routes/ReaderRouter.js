const Router = require("express");
const router = new Router();
const readerController = require("../controllers/ReaderController");
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
  readerController.getCountPages
);
router.get(
  "/page/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  readerController.getPage
);
router.get(
  "/element/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  readerController.getById
);
router.post(
  "/create/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  readerController.createElement
);
router.put(
  "/update/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  readerController.updateElement
);
router.delete(
  "/delete/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  readerController.deleteElementIncludeById
);

module.exports = router;
