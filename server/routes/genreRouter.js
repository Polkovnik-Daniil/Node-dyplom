const Router = require("express");
const router = new Router();
const genreController = require("../controllers/genreController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
const checkLockedMiddleware = require("../middleware/checkLockedMiddleware");

router.get(
  "/pages/",
  // authMiddleware,
  // checkRoleMiddleware("Admin, Moderator"),
  // checkLockedMiddleware,
  genreController.getCountPages
);
router.get(
  "/page/:id",
  // authMiddleware,
  // checkRoleMiddleware("Admin, Moderator"),
  // checkLockedMiddleware,
  genreController.getPage
);
router.get(
  "/element/:id",
  // authMiddleware,
  // checkRoleMiddleware("Admin, Moderator"),
  // checkLockedMiddleware,
  genreController.getById
); //будет ли известен id пользователю??
router.post(
  "/create/",
  // authMiddleware,
  // checkRoleMiddleware("Admin, Moderator"),
  // checkLockedMiddleware,
  genreController.createElement
);
router.put(
  "/update/",
  // authMiddleware,
  // checkRoleMiddleware("Admin, Moderator"),
  // checkLockedMiddleware,
  genreController.updateElement
); //будет ли известен id пользователю??
router.delete(
  "/delete/",
  // authMiddleware,
  // checkRoleMiddleware("Admin, Moderator"),
  // checkLockedMiddleware,
  genreController.deleteElement
); //будет ли известен id пользователю??

module.exports = router;
