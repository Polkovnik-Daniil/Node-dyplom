module.exports = {
  name: {
    in: ["body"],
    isString: { errorMessage: "Name should be string" },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Name should be at least 1 characters",
    },
    trim: true,
  },
  email: {
    in: ["body"],
    exists: { errorMessage: "Email is required" },
    isEmail: { errorMessage: "Email is required" },
    isString: { errorMessage: "Email should be string" },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Email should be at least 1 characters",
    },
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
  role: {
    in: ["body"],
    isString: { errorMessage: "Role should be string" },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Role should be at least 1 characters",
    },
    trim: true,
  },
  isLocked: {
    in: ["body"],
    isBoolean: { errorMessage: "isLocked should be boolean" },
  },
};
