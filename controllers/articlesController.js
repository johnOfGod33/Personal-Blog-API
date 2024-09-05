const Article = require("../models/Article");
const redisClient = require("../config/redisConfig");

const setArticlesCache = async (articles, cacheKey) => {
  try {
    let value = JSON.stringify(articles);

    await redisClient.setEx(cacheKey, 600, value);
  } catch (err) {
    throw new Error(`can't cache the value. error: ${err}`);
  }
};

exports.createArticle = (req, res) => {
  const article = req.body;
  article.author = req.ID;

  Article.create(article)
    .then((value) => {
      res.status(201).json({ message: "article created", value });
    })
    .catch((err) =>
      res.status(503).json({
        message: "service is currently unvailable. Please try again later",
      })
    );
};

exports.getPublishedArticles = async (req, res) => {
  const page = req.query.p || 0;
  const limit = req.query.limit || 5;
  const cacheKey = `publishedArticles/${req.authorID}/page${page}`;

  try {
    const articles = await Article.find(
      { published: true, author: req.authorID },
      { content: 0, Comments: 0 }
    )
      .populate("author", { username: 1 })
      .skip(page * limit)
      .limit(limit);

    await setArticlesCache(articles, cacheKey);

    res.status(200).json({ articles });
  } catch (err) {
    console.log("vooici l'erreur :", err);
    res.status(503).json({
      message: "service is currently unvailable. Please try again later",
    });
  }
};

exports.getDraftArticles = async (req, res) => {
  const page = req.query.p || 0;
  const limit = req.query.limit || 5;
  const cacheKey = `draftArticles/${req.ID}/page${page}`;

  try {
    const articles = await Article.find({ published: false, author: req.ID })
      .populate("author", { username: 1 })
      .skip(page * limit)
      .limit(limit);

    await setArticlesCache(articles, cacheKey);

    res.status(200).json({ articles });
  } catch (err) {
    res.status(503).json({
      message: "service is currently unvailable. Please try again later",
    });
  }
};

exports.getArticleById = async (req, res) => {
  const articleId = req.params.id;
  const cacheKey = `article/${articleId}`;

  try {
    const article = await Article.findOne({ _id: articleId }).populate(
      "author",
      {
        username: 1,
      }
    );

    if (article) {
      await setArticlesCache(article, cacheKey);

      res.status(200).json({ article });
    } else {
      res.status(404).json("article not find");
    }
  } catch (err) {
    console.log(err);
    res.status(503).json({
      message: "service is currently unvailable. Please try again later",
    });
  }
};

exports.getArticleByTitle = async (req, res) => {
  const articleTitle = req.params.articleTitle;
  const cacheKey = `article/${articleTitle}`;

  try {
    const article = await Article.findOne({ title: articleTitle }).populate(
      "author",
      {
        username: 1,
      }
    );

    if (article) {
      await setArticlesCache(article, cacheKey);

      res.status(200).json({ article });
    } else {
      res.status(404).json("article not find");
    }
  } catch (err) {
    res.status(503).json({
      message: "service is currently unvailable. Please try again later",
    });
  }
};

exports.updateArticle = (req, res) => {
  const articleId = req.params.id;

  Article.updateOne({ _id: articleId }, { $set: req.body })
    .then((value) => res.status(200).json({ message: "article updated" }))
    .catch((err) =>
      res.status(503).json({
        message: "service is currently unvailable. Please try again later",
      })
    );
};

exports.addComment = (req, res) => {
  const articleId = req.params.id;

  Article.updateOne({ _id: articleId }, { $push: { Comments: req.body } })
    .then((value) => res.status(200).json({ message: "comment posted" }))
    .catch((err) =>
      res.status(503).json({
        message: "service is currently unvailable. Please try again later",
      })
    );
};

exports.deleteArticle = (req, res) => {
  const articleId = req.params.id;

  Article.deleteOne({ _id: articleId })
    .then((value) => {
      res.status(200).json({ message: "article deleted" });
    })
    .catch((err) =>
      res.status(503).json({
        message: "service is currently unvailable. Please try again later",
      })
    );
};
