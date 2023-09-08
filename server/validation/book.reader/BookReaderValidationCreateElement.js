module.exports = {
  bookId: {
    in: ["body"],
    isUUID: { errorMessage: "Book Id is not UUID" },
    exists: { errorMessage: "Book Id is required" },
    isLength: {
      options: { min: 36, max: 40 },
      errorMessage: "Book Id should be at least 5 characters",
    },
  },
  readerId: {
    in: ["body"],
    isUUID: { errorMessage: "Reader Id is not UUID" },
    exists: { errorMessage: "Reader Id is required" },
    isLength: {
      options: { min: 36, max: 40 },
      errorMessage: "Reader Id should be at least 5 characters",
    },
  },
  userId: {
    in: ["body"],
    isUUID: { errorMessage: "User Id is not UUID" },
    exists: { errorMessage: "User Id is required" },
    isLength: {
      options: { min: 36, max: 40 },
      errorMessage: "User Id should be at least 5 characters",
    },
  },
  dateOfIssueOfTheBook: {
    in: ["body"],
    exists: { errorMessage: "Date of issue of the book is required" },
    isDate: { errorMessage: "Date of issue of the book should be date" },
  },
  dateOfBookAcceptance: {
    in: ["body"],
    exists: { errorMessage: "Date of book acceptance is required" },
    isDate: { errorMessage: "Date of book acceptance should be date" },
  },
};
