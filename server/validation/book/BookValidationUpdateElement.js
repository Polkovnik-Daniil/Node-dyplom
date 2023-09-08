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
  title: {
    in: ["body"],
    exists: { errorMessage: "Name is required" },
    isString: { errorMessage: "Name should be string" },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Name should be at least 5 characters",
    },
  },
  releaseDate: {
    in: ["body"],
    exists: { errorMessage: "Release date is required" },
    isDate: { errorMessage: "Release date should be string" },
  },
  numberOfBooks: {
    in: ["body"],
    exists: { errorMessage: "Number of books is required" },
    isInt: {
      options: { min: 1 },
      errorMessage: "Number of books should be string",
    },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Number of books should be at least 5 characters",
    },
  },
  numberOfPage: {
    in: ["body"],
    exists: { errorMessage: "Number of page is required" },
    isInt: {
      options: { min: 0 },
      errorMessage: "Number of page should be string",
    },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Number of page should be at least 5 characters",
    },
  },
};
