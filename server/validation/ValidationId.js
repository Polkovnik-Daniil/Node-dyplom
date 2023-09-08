module.exports = {
  id: {
    in: ["params"],
    isUUID: { errorMessage: "Name is not UUID" },
    exists: { errorMessage: "Name is required" },
  },
};
