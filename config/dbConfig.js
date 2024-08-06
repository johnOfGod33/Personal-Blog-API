require("dotenv").config();
const mongoose = require("mongoose");

const connectionDb = async (callback) => {
  try {
    await mongoose.connect(process.env.DB_URI);
    callback();
  } catch (err) {
    callback(err);
  }
};

module.exports = connectionDb;
