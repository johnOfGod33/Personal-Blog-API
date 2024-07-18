require("dotenv").config();
const User = require("../models/User");
const auth = require("jwt-auths-module");

const findUser = (email, callback) => {
  User.find({ email })
    .then((user) => {
      return callback(user);
    })
    .catch(() => {
      return callback();
    });
};

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

  findUser(email, (user) => {
    if (!user) {
      auth
        .hashPassword(password)
        .then((encryptedPassword) => createUser(encryptedPassword))
        .catch((err) => {
          res.status(400).json(err);
        });
    } else {
      res.status(400).json({ error: "email already exist" });
    }
  });
};

exports.login = (req, res) => {
  const { email, inputPassword } = req.body;
  const messageError = "passwoword or email incorrect";

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
          console.log(token);
          res.status(201).json(token);
        })
        .catch((err) => {
          res.status(401).json(messageError);
        });
    } else {
      res.status(404).json(messageError);
    }
  });
};
