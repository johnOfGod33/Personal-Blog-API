require("dotenv").config();
const mongoose = require("mongoose");

const connectionDb = (callback) => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      return callback();
    })
    .catch((err) => {
      console.log(err);
      return callback(err);
    });
};

module.exports = connectionDb;
