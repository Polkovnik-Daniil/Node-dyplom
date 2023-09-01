const jwt = require("jsonwebtoken");

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      isAccess = role.includes(req.user.role);
      if (!isAccess) {
        return res.status(403).json({ message: "Нет доступа" });
      }
      next();
    } catch (e) {
      res.status(401).json({ message: "Не авторизован" });
    }
  };
};
