const logger = require("../logs/logger");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    logger.info(
      "(" + req.method + "):(" + req.originalUrl + "):(" + req.params + "):(" + req.body + ")"
    );
    next();
  } catch (e) {
    res.status(409).json({ message: "Ошибка сервера" });
  }
};
