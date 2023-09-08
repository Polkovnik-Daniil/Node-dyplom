module.exports = {
  name: {
    in: ["body"],
    exists: { errorMessage: "Name is required" },
    isString: { errorMessage: "Name should be string" },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Name should be at least 5 characters",
    },
    trim: true,
  },
  surname: {
    in: ["body"],
    exists: { errorMessage: "Surname is required" },
    isString: { errorMessage: "Surname should be string" },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Surname should be at least 5 characters",
    },
    trim: true,
  },
  patrinymic: {
    in: ["body"],
    exists: { errorMessage: "Patrinymic is required" },
    isString: { errorMessage: "Patrinymic should be string" },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Patrinymic should be at least 5 characters",
    },
    trim: true,
  },
  placeOfResidence: {
    in: ["body"],
    exists: { errorMessage: "Patrinymic is required" },
    isString: { errorMessage: "Patrinymic should be string" },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Patrinymic should be at least 5 characters",
    },
  },
  phoneNumber: {
    in: ["body"],
    exists: { errorMessage: "Patrinymic is required" },
    isString: { errorMessage: "Patrinymic should be string" },
    isPhoneNumber: true,
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Patrinymic should be at least 5 characters",
    },
  },
};
