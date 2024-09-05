const Article = require("../models/Article");
const redisClient = require("../config/redisConfig");
const { json } = require("express");

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

  const setPublishedArticleCache = async (articles) => {
    try {
      let value = JSON.stringify(articles);

      await redisClient.setEx(
        `publishedArticles/${req.authorID}/page${page}`,
        600,
        value
      );
    } catch (err) {
      console.log({ message: "can't cache published article", err });
      throw err;
    }
  };

  try {
    const articles = await Article.find(
      { published: true, author: req.authorID },
      { content: 0, Comments: 0 }
    )
      .populate("author", { username: 1 })
      .skip(page * limit)
      .limit(limit);

    await setPublishedArticleCache(articles);

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

  const setDraftArticlesCache = async (articles) => {
    try {
      let value = JSON.stringify(articles);

      await redisClient.setEx(
        `draftArticles/${req.ID}/page${page}`,
        600,
        value
      );
    } catch (err) {
      console.log({ message: "can't cache published article", err });
      throw err;
    }
  };

  try {
    const articles = await Article.find({ published: false, author: req.ID })
      .populate("author", { username: 1 })
      .skip(page * limit)
      .limit(limit);

    await setDraftArticlesCache(articles);

    res.status(200).json({ articles });
  } catch (err) {
    res.status(503).json({
      message: "service is currently unvailable. Please try again later",
    });
  }
};

exports.getArticleById = (req, res) => {
  const articleId = req.params.id;

  Article.findOne({ _id: articleId })
    .populate("author", { username: 1 })
    .then((article) => {
      article
        ? res.status(200).json(article)
        : res.status(404).json("article not find");
    })
    .catch((err) =>
      res.status(503).json({
        message: "service is currently unvailable. Please try again later",
      })
    );
};

exports.getArticleByTitle = (req, res) => {
  const articleTitle = req.params.articleTitle;

  Article.findOne({ title: articleTitle })
    .populate("author", { username: 1 })
    .then((article) => {
      article
        ? res.status(200).json(article)
        : res.status(404).json("article not find");
    })
    .catch((err) =>
      res.status(503).json({
        message: "service is currently unvailable. Please try again later",
      })
    );
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
