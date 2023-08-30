const Router = require("express");
const router = new Router();
const genreController = require("../controllers/genreController");

router.get("/pages/", genreController.getCountPages);
router.get("/page/:id", genreController.getPage); 
router.get("/element/:id", genreController.getOne); //будет ли известен id пользователю??
router.post("/create/", genreController.create);
router.post("/create-array/", genreController.createArray); //it is necessary to check the operability
router.put("/update/:id", genreController.updateElement); //на тот случай если id не будет известен
router.put("/update/:id", genreController.updateElement); //будет ли известен id пользователю??


module.exports = router;
