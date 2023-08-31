const jwt = require("jsonwebtoken");

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      is_access = role.includes(req.user.role);
      if (!is_access) {
        return res.status(403).json({ message: "Нет доступа" });
      }
      next();
    } catch (e) {
      res.status(401).json({ message: "Не авторизован" });
    }
  };
};
