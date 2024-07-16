const verifyEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex =
    /[a-zA-Z]{4,}\d*@(gmail|outlook|yahoo|hotmail|live)\.(com|fr)/;

  if (emailRegex.test(email)) {
    next();
  } else {
    res.status(400).json({ error: "Invalid email format" });
  }
};

module.exports = verifyEmail;
