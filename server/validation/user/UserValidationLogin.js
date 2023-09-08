module.exports = {
  email: {
    in: ["body"],
    exists: { errorMessage: "Email is required" },
    isEmail: { errorMessage: "Email is required" },
    trim: true,
  },
  password: {
    in: ["body"],
    exists: { errorMessage: "Password is required" },
    isString: { errorMessage: "Password should be string" },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Password should be at least 1 characters",
    },
    trim: true,
  },
};
