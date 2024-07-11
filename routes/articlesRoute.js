const express = require("express");
const auth = require("auth-module");
const articlesCtrl = require("../controllers/articlesController");
const router = express.Router();

router.post("/createArtcicle", auth.verifyToken, articlesCtrl.createArticle);

router.get("/getPublishedArticles", articlesCtrl.getPublishedArticles);

router.get(
  "/getDraftArticles",
  auth.verifyToken,
  articlesCtrl.getDraftArticles
);

router.get("/getOneArticle/:id", articlesCtrl.getOneArticle);

router.put("/updateArticle/:id", auth.verifyToken, articlesCtrl.updateArticle);

router.put("/addComment/:id", articlesCtrl.addComment);

router.delete(
  "/deleteArticle/:id",
  auth.verifyToken,
  articlesCtrl.deleteArticle
);

module.exports = router;
