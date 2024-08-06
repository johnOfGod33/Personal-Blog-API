const verifyEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex =
    /[a-zA-Z]{4,}\d*@(gmail|outlook|yahoo|hotmail|live)\.(com|fr)/;

  if (emailRegex.test(email)) {
    next();
  } else {
    res
      .status(400)
      .json({ message: "Invalid email format or email's field miss" });
  }
};

module.exports = verifyEmail;
