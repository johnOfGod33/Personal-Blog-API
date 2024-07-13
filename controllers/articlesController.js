const Article = require("../models/Article");
const Articles = require("../models/Article");

exports.createArticle = (req, res) => {
  const article = req.body;
  article.author = req.ID;

  Articles.create(article)
    .then((value) => {
      res.status(201).json(value);
    })
    .catch((err) => res.status(500).json(err));
};

exports.getPublishedArticles = (req, res) => {
  Articles.find({ published: true })
    .populate("author", { username: 1 })
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((err) => res.status(500).json(err));
};

exports.getDraftArticles = (req, res) => {
  Articles.find({ published: false })
    .populate("author", { username: 1 })
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((err) => res.status(500).json(err));
};

exports.getOneArticle = (req, res) => {
  const articleId = req.params.id;

  Articles.findOne({ _id: articleId })
    .populate("author", { username: 1 })
    .then((article) => {
      article
        ? res.status(200).json(article)
        : res.status(404).json("article not find");
    })
    .catch((err) => res.status(500).json(err));
};

exports.updateArticle = (req, res) => {
  const articleId = req.params.id;

  Article.updateOne({ _id: articleId }, { $set: req.body })
    .then((value) => res.status(200).json(value))
    .catch((err) => res.status(500).json(err));
};

exports.addComment = (req, res) => {
  const articleId = req.params.id;

  Article.updateOne({ _id: articleId }, { $push: { Comments: req.body } })
    .then((value) => res.status(200).json(value))
    .catch((err) => res.status(500).json(err));
};

exports.deleteArticle = (req, res) => {
  const articleId = req.params.id;

  Articles.deleteOne({ _id: articleId })
    .then((value) => {
      res.status(200).json(value);
    })
    .catch((err) => res.status(500).json(err));
};
