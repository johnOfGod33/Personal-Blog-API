const express = require("express");
const usersCtrl = require("../controllers/usersController");
const verifyEmail = require("../middlewares/verifyEmail");
const router = express.Router();

router.post("/signup", verifyEmail, usersCtrl.signup);
router.post("/login", usersCtrl.login);

module.exports = router;
