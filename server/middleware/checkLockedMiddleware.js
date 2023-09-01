const jwt = require("jsonwebtoken");

module.exports = function () {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      if (req.user.isLocked) {
        return res.status(403).json({ message: "Нет доступа" });
      }
      next();
    } catch (e) {
      res.status(401).json({ message: "Не авторизован" });
    }
  };
};
