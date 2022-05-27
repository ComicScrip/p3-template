const axios = require("axios");

module.exports.signup = (data) => {
  return axios.post("/api/users", data);
};
