const redisClient = require("../../config/redisConfig");

const getValue = async (cacheKey) => {
  try {
    let isExits = await redisClient.exists(cacheKey);

    if (isExits) {
      let value = await redisClient.get(cacheKey);

      value = JSON.parse(value);

      return value;
    } else {
      throw new Error("value don't exist");
    }
  } catch (err) {
    throw err;
  }
};

exports.getPublishedArticlesCache = async (req, res, next) => {
  const page = req.query.p || 0;
  const cacheKey = `publishedArticles/${req.authorID}/page${page}`;

  try {
    let value = await getValue(cacheKey);

    res
      .status(200)
      .json({ message: "get published article by cache", articles: value });
  } catch (err) {
    console.log("can't get published articles cache: ", err);
    next();
  }
};

exports.getDraftArticlesCache = async (req, res, next) => {
  const page = req.query.p || 0;
  const cacheKey = `draftArticles/${req.ID}/page${page}`;

  try {
    let value = await getValue(cacheKey);

    res
      .status(200)
      .json({ message: "get draft article by cache", articles: value });
  } catch (err) {
    console.log("can't get draft articles cache: ", err);
    next();
  }
};

exports.getArticleByIdCache = async (req, res, next) => {
  const articleId = req.params.id;
  const cacheKey = `article/${articleId}`;

  try {
    let value = await getValue(cacheKey);

    res.status(200).json({ message: "get article by cache", article: value });
  } catch (err) {
    console.log("can't get article by cache: ", err);
    next();
  }
};

exports.getArticleByTitleCache = async (req, res, next) => {
  const articleTitle = req.params.articleTitle;
  const cacheKey = `article/${articleTitle}`;

  try {
    let value = await getValue(cacheKey);

    res.status(200).json({ message: "get article by cache", article: value });
  } catch (err) {
    console.log("can't get article by cache: ", err);
    next();
  }
};
