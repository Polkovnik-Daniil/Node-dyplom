const AuthorizationMiddleware = require("./AuthorizationMiddleware");
const CheckLockedMiddleware = require("./CheckLockedMiddleware");
const CheckRoleMiddleware = require("./CheckRoleMiddleware");
const ErrorHandlingMiddleware = require("./ErrorHandlingMiddleware");
const LoggerMiddleware = require("./LoggerMiddleware");

module.exports = {
  AuthorizationMiddleware,
  CheckLockedMiddleware,
  CheckRoleMiddleware,
  ErrorHandlingMiddleware,
  LoggerMiddleware,
};
