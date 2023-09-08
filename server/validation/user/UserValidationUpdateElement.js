module.exports = {
  id: {
    in: ["body"],
    isUUID: { errorMessage: "Name is not UUID" },
    exists: { errorMessage: "Name is required" },
    isLength: {
      options: { min: 36, max: 40 },
      errorMessage: "Name should be at least 5 characters",
    },
  },
  name: {
    in: ["body"],
    exists: { errorMessage: "Name is required" },
    isString: { errorMessage: "Name should be string" },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Name should be at least 5 characters",
    },
  },
  email: {
    in: ["body"],
    exists: { errorMessage: "Surname is required" },
    isString: { errorMessage: "Surname should be string" },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Surname should be at least 5 characters",
    },
  },
  roleId: {
    in: ["body"],
    isUUID: { errorMessage: "Name is not UUID" },
    exists: { errorMessage: "Name is required" },
    isLength: {
      options: { min: 36, max: 40 },
      errorMessage: "Name should be at least 5 characters",
    },
  },
  refreshToken: {
    in: ["body"],
    isString: { errorMessage: "Patrinymic should be string" },
    isLength: {
      options: { min: 1, max: 400 },
      errorMessage: "Patrinymic should be at least 5 characters",
    },
  },
  refreshTokenExpiryTime: {
    in: ["body"],
    isString: { errorMessage: "Patrinymic should be string" },
    isLength: {
      options: { min: 1, max: 400 },
      errorMessage: "Patrinymic should be at least 5 characters",
    },
  },
  isLocked: {
    in: ["body"],
    isString: { errorMessage: "Patrinymic should be string" },
    isLength: {
      options: { min: 1, max: 400 },
      errorMessage: "Patrinymic should be at least 5 characters",
    },
  },
};
