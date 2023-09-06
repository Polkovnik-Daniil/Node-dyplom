const Router = require("express");
const router = new Router();

const genreRouter = require("./GenreRouter");
const userRouter = require("./UserRouter");
const authorRouter = require("./AuthorRouter");
const readerRouter = require("./ReaderRouter");


router.use("/author", authorRouter);
router.use("/genre", genreRouter);
router.use("/user", userRouter);
router.use("/reader", readerRouter);

module.exports = router;
