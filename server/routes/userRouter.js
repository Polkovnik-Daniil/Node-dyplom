const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/AuthorizationMiddleware");
const checkLockedMiddleware = require("../middleware/CheckLockedMiddleware");
const checkRoleMiddleware = require("../middleware/CheckRoleMiddleware");
const loggerMiddleware = require("../middleware/LoggerMiddleware");
router.post("/registration", userController.registration);
router.post("/create", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMiddleware, userController.check);
//Обработчик отвечающий за провекру роли
router.get(
  "/element/:id",
  loggerMiddleware,
  authMiddleware,
  checkRoleMiddleware("Admin"),
  checkLockedMiddleware,
  userController.getById
); 

module.exports = router;
