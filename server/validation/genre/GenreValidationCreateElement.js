module.exports = {
  name: {
    in: ["body"],
    exists: { errorMessage: "Name is required" },
    isString: { errorMessage: "Name should be string" },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Name should be at least 1 characters",
    },
    trim: true,
  },
};
