const Article = require("../models/Article");

exports.createArticle = (req, res) => {
  const article = req.body;
  article.author = req.ID;

  Article.create(article)
    .then((value) => {
      res.status(201).json(value);
    })
    .catch((err) => res.status(500).json(err));
};

exports.getPublishedArticles = (req, res) => {
  const page = req.query.p || 0;
  const limit = req.query.limit || 100;

  Article.find(
    { published: true, author: req.authorID },
    { content: 0, Comments: 0 }
  )
    .skip(page * limit)
    .limit(limit)
    .then((articles) => {
      res.status(200).json({ articles });
    })
    .catch((err) => res.status(500).json(err));
};

exports.getDraftArticles = (req, res) => {
  const page = req.query.p || 0;
  const limit = req.query.limit || 100;

  Article.find({ published: false, author: req.ID })
    .populate("author", { username: 1 })
    .skip(page * limit)
    .limit(limit)
    .then((articles) => {
      res.status(200).json({ articles });
    })
    .catch((err) => res.status(500).json(err));
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
    .catch((err) => res.status(500).json(err));
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
    .catch((err) => res.status(500).json(err));
};

exports.updateArticle = (req, res) => {
  const articleId = req.params.id;

  Article.updateOne({ _id: articleId }, { $set: req.body })
    .then((value) => res.status(200).json({ message: "article updated" }))
    .catch((err) => res.status(500).json(err));
};

exports.addComment = (req, res) => {
  const articleId = req.params.id;

  Article.updateOne({ _id: articleId }, { $push: { Comments: req.body } })
    .then((value) => res.status(200).json({ message: "comment posted" }))
    .catch((err) => res.status(500).json(err));
};

exports.deleteArticle = (req, res) => {
  const articleId = req.params.id;

  Article.deleteOne({ _id: articleId })
    .then((value) => {
      res.status(200).json({ message: "article deleted" });
    })
    .catch((err) => res.status(500).json(err));
};
