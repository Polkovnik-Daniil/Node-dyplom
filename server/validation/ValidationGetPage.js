module.exports = {
  id: {
    in: ["params"],
    isInt: { options: { min: 1 }, errorMessage: "Id is not int" },
    exists: { errorMessage: "Id is required" },
  },
};
