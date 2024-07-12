require("dotenv").config();
const User = require("../models/User");
const auth = require("auth-module");

exports.signup = (req, res) => {
  const { username, password, email } = req.body;

  const createUser = (encryptedPassword) => {
    User.create({ username, email, password: encryptedPassword })
      .then((value) => {
        res.status(201).json(value);
      })
      .catch((err) => {
        res.status(501).json(err);
      });
  };

  auth
    .getHashPassword(password)
    .then((encryptedPassword) => createUser(encryptedPassword))
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.login = (req, res) => {
  const { email, inputPassword } = req.body;
  const messageError = "passwoword or email incorrect";

  User.findOne({ email }, { _id: 1, password: 1 })
    .then((user) => {
      auth
        .authentification(
          user.password,
          inputPassword,
          user._id,
          process.env.SECRET_KEY
        )
        .then((token) => {
          console.log(token);
          res.status(201).json(token);
        })
        .catch((err) => {
          res.status(401).json(messageError);
        });
    })
    .catch((err) => {
      res.status(401).json(messageError);
    });
};
