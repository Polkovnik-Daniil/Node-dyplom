module.exports = {
  bookId: {
    in: ["body"],
    isUUID: { errorMessage: "Name is not UUID" },
    exists: { errorMessage: "Name is required" },
    isLength: {
      options: { min: 36, max: 40 },
      errorMessage: "Name should be at least 5 characters",
    },
  },
  authorId: {
    in: ["body"],
    isUUID: { errorMessage: "Name is not UUID" },
    exists: { errorMessage: "Name is required" },
    isLength: {
      options: { min: 36, max: 40 },
      errorMessage: "Name should be at least 5 characters",
    },
  },
};
