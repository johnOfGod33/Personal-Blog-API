const User = require("../models/User");

const getAuthorID = (req, res, next) => {
  const authorEmail = req.params.authorEmail;

  User.findOne({ email: authorEmail }, { _id: 1 })
    .then((result) => {
      req.authorID = result._id;
      next();
    })
    .catch((err) => res.status(404).json({ message: "author not found" }));
};

module.exports = getAuthorID;
