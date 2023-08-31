const Router = require("express");
const router = new Router();
const genreController = require("../controllers/genreController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.get("/pages/", authMiddleware, checkRoleMiddleware("Admin, Moderator"),  genreController.getCountPages);
router.get("/page/:id", authMiddleware, checkRoleMiddleware("Admin, Moderator"), genreController.getPage); 
router.get("/element/:id", authMiddleware, checkRoleMiddleware("Admin, Moderator"), genreController.getById); //будет ли известен id пользователю??
router.post("/create/", authMiddleware, checkRoleMiddleware("Admin, Moderator"), genreController.create);
router.post("/create-array/", authMiddleware, checkRoleMiddleware("Admin, Moderator"), genreController.createArray); //it is necessary to check the operability
router.put("/update/:id", authMiddleware, checkRoleMiddleware("Admin, Moderator"), genreController.updateElement); //на тот случай если id не будет известен
router.put("/update/:id", authMiddleware, checkRoleMiddleware("Admin, Moderator"), genreController.updateElement); //будет ли известен id пользователю??


module.exports = router;
