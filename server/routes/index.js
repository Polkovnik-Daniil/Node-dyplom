const Router = require("express");
const router = new Router();

const genreRouter = require("./GenreRouter");
const userRouter = require("./UserRouter");
const authorRouter = require("./AuthorRouter");
const readerRouter = require("./ReaderRouter");
const bookAuthorRouter = require("./BookAuthorRouter");
const bookGenreRouter = require("./BookGenreRouter");
const bookReaderRouter = require("./BookReaderRouter");
const bookRouter = require("./BookRouter");


router.use("/author", authorRouter);
router.use("/genre", genreRouter);
router.use("/user", userRouter);
router.use("/reader", readerRouter);
router.use("/bookau", bookAuthorRouter);
router.use("/bookgr", bookGenreRouter);
router.use("/bookrd", bookReaderRouter);
router.use("/book", bookRouter);

module.exports = router;
