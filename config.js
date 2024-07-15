require("dotenv").config();
module.exports = {
  mongoURI: process.env.REACT_APP_MONGO_URI,
  jwtSecret: process.env.REACT_APP_JWT_TOKEN,
};
