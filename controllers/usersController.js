require("dotenv").config();
const User = require("../models/User");
const auth = require("jwt-auths-module");

const findUser = (email, callback) => {
  User.findOne({ email })
    .then((user) => {
      return callback(user);
    })
    .catch((err) => {
      return callback();
    });
};

exports.signup = (req, res) => {
  const { username, password, email } = req.body;

  const createUser = (encryptedPassword) => {
    User.create({ username, email, password: encryptedPassword })
      .then((value) => {
        res.status(201).json({ message: "user created", value });
      })
      .catch((err) => {
        res.status(503).json({
          message: "service is currently unvailable. Please try again later",
        });
      });
  };

  findUser(email, (user) => {
    if (!user) {
      auth
        .hashPassword(password)
        .then((encryptedPassword) => createUser(encryptedPassword))
        .catch((err) => {
          res.status(500).json({
            message: "unexpected error occured. Please try agian later",
          });
        });
    } else {
      res.status(400).json({ message: "email already exist" });
    }
  });
};

exports.login = (req, res) => {
  const { email, inputPassword } = req.body;
  const messageError = "password or email incorrect";

  findUser(email, (user) => {
    if (user) {
      auth
        .authenticateUser(
          user.password,
          inputPassword,
          user._id,
          process.env.SECRET_KEY
        )
        .then((token) => {
          res.status(201).json({ message: "access token created", token });
        })
        .catch((err) => {
          res.status(401).json({ message: messageError });
        });
    } else {
      res.status(404).json({ message: messageError });
    }
  });
};
