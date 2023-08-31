const { User, Role } = require("../models/models");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id, email, role, is_locked) => {
  return jwt.sign({ id, email, role, is_locked }, process.env.SECRET_KEY, {
    expiresIn: "96h",
  });
};

class UserController {
  async registration(req, res, next) {
    let { name, email, password, role, is_locked } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Некорректный email или password"));
    }
    const candidate = await User.findOne({ where: { email: email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    role = await Role.findOne({ where: { name: role || "User" } });
    let role_id = role.id;
    const user = await User.create({
      name: name || "User",
      email: email,
      role_id: role_id,
      password: hashPassword,
      is_locked: is_locked || false
    });
    const token = generateJwt(user.id, user.email, user.role, user.is_locked);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("Пользователь не найден"));
    }
    let role = await Role.findOne({ where: { id: user.role_id } });
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Указан неверный пароль"));
    }
    const token = generateJwt(user.id, user.email, role.name, user.is_locked);
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }

  async getById(){
    
  }
}

module.exports = new UserController();
