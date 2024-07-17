const User = require("../models/User");

const getAuthorID = (req, res, next) => {
  const authorEmail = req.params.authorEmail || req.query.authorEmail;

  User.findOne({ email: authorEmail }, { _id: 1 })
    .then((result) => {
      req.authorID = result._id;
      next();
    })
    .catch((err) => res.status(404).json({ error: "author not found" }));
};

module.exports = getAuthorID;
