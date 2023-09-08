const { validationResult } = require("express-validator");
const logger = require("../logs/logger");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      logger.error(errors.array());
      return response.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  } catch (e) {
    res.status(401).json({ message: "Не авторизован" });
  }
};
