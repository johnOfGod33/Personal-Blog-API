const express = require("express");
const auth = require("jwt-auths-module");
const articlesCtrl = require("../controllers/articlesController");
const router = express.Router();

router.post(
  "/createArticle",
  auth.verifyToken(process.env.SECRET_KEY),
  articlesCtrl.createArticle
);

router.get("/getPublishedArticles", articlesCtrl.getPublishedArticles);

router.get(
  "/getDraftArticles",
  auth.verifyToken(process.env.SECRET_KEY),
  articlesCtrl.getDraftArticles
);

router.get("/getOneArticle/:id", articlesCtrl.getOneArticle);

router.put(
  "/updateArticle/:id",
  auth.verifyToken(process.env.SECRET_KEY),
  articlesCtrl.updateArticle
);

router.put("/addComment/:id", articlesCtrl.addComment);

router.delete(
  "/deleteArticle/:id",
  auth.verifyToken(process.env.SECRET_KEY),
  articlesCtrl.deleteArticle
);

module.exports = router;
