const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMiddleware, userController.check);
//Обработчик отвечающий за провекру роли
router.get("/element/:id", checkRole("Admin"), userController.getOne); //будет ли известен id пользователю??

module.exports = router;
