const Router = require("express");
const router = new Router();

const genreRouter = require("./genreRouter");
const userRouter = require("./userRouter");
const authorRouter = require("./authorRouter");


router.use("/author", authorRouter);
router.use("/genre", genreRouter);
router.use("/user", userRouter);

module.exports = router;
