const redisClient = require("../../config/redisConfig");

exports.getPublishedArticlesCache = async (req, res, next) => {
  const page = req.query.p || 0;

  try {
    let isExits = await redisClient.exists(
      `publishedArticles/${req.authorID}/page${page}`
    );

    if (isExits) {
      let value = await redisClient.get(
        `publishedArticles/${req.authorID}/page${page}`
      );

      value = JSON.parse(value);

      res
        .status(200)
        .json({ message: "get published article by cache", value });
    } else {
      next();
    }
  } catch (err) {
    console.log("can't get published articles cache: ", err);
    next();
  }
};