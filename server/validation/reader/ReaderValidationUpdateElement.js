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
  surname: {
    in: ["body"],
    exists: { errorMessage: "Surname is required" },
    isString: { errorMessage: "Surname should be string" },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Surname should be at least 5 characters",
    },
  },
  patrinymic: {
    in: ["body"],
    exists: { errorMessage: "Patrinymic is required" },
    isString: { errorMessage: "Patrinymic should be string" },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Patrinymic should be at least 5 characters",
    },
  },
  placeOfResidence: {
    in: ["body"],
    exists: { errorMessage: "Place of residence is required" },
    isString: { errorMessage: "Place of residence  should be string" },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Place of residence  should be at least 5 characters",
    },
  },
  phoneNumber: {
    in: ["body"],
    exists: { errorMessage: "Phone number is required" },
    isString: { errorMessage: "Phone number should be string" },
    isPhoneNumber: true,
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Phone number should be at least 5 characters",
    },
  },
};
