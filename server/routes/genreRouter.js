const Router = require("express");
const router = new Router();
const genreController = require("../controllers/genreController");
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
  genreController.getCountPages
);
router.get(
  "/page/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  genreController.getPage
);
router.get(
  "/element/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  genreController.getById
);
router.post(
  "/create/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  genreController.createElement
);
router.put(
  "/update/",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  genreController.updateElementIncludeById
);
router.delete(
  "/delete/:id",
  LoggerMiddleware,
  AuthorizationMiddleware,
  CheckRoleMiddleware("Admin, Moderator"),
  CheckLockedMiddleware,
  genreController.deleteElementIncludeById
);

module.exports = router;
