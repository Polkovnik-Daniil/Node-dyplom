const Router = require("express");
const router = new Router();

const genreRouter = require("./genreRouter");

router.use("/genre", genreRouter);

module.exports = router;
