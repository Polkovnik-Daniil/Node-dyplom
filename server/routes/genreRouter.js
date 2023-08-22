const Router = require("express");
const router = new Router();
const genreController = require("../controllers/genreController");
//access-denied!
router.get("/", genreController.getAll); //delete on release!
router.get("/pages/", genreController.getCountPages);
router.get("/page/:id", genreController.getPage);
router.get("/element/:id", genreController.getOne);
router.post("/create/", genreController.create);
router.post("/create-array/", genreController.createArray);

module.exports = router;
