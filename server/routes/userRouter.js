const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const checkLockedMiddleware = require("../middleware/checkLockedMiddleware");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMiddleware, userController.check);
//Обработчик отвечающий за провекру роли
router.get(
  "/element/:id",
  authMiddleware,
  checkRoleMiddleware("Admin"),
  checkLockedMiddleware,
  userController.getById
); //будет ли известен id пользователю??

module.exports = router;
