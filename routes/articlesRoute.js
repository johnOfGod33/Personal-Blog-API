const express = require("express");
const auth = require("jwt-auths-module");
const articlesCtrl = require("../controllers/articlesController");
const articlesCache = require("../middlewares/cache/articlesCache");
const getAuthorID = require("../middlewares/getAuthorID");
const verifyEmail = require("../middlewares/verifyEmail");

const router = express.Router();

/**
 * @swagger
 * /articles/createArticle:
 *  post:
 *    summary: create a new article
 *    tags:
 *      - articles
 *    description: create new article
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Article"
 *    responses:
 *      201:
 *        description: article created
 *      401:
 *        description: unauthorized, token expired or undefined
 *      500:
 *        description: server error
 */
router.post(
  "/createArticle",
  auth.verifyToken(process.env.SECRET_KEY),
  articlesCtrl.createArticle
);

/**
 * @swagger
 * /articles/getPublishedArticles/{authorEmail}:
 *  get:
 *    summary: get list of published article
 *    tags:
 *      - articles
 *    description: get user's published articles by his email
 *    parameters:
 *      - name: authorEmail
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: user's email
 *      - name : p
 *        in: query
 *        required: false
 *        schema:
 *          type: number
 *          default: 0
 *        description:  the actual page number
 *      - name : limit
 *        in: query
 *        required: false
 *        schema:
 *          type: number
 *          default: 5
 *        description: limit the article list returned
 *    responses:
 *      200:
 *        description: success
 *      404:
 *        description: author not found
 *      500:
 *        description: server error
 */
router.get(
  "/getPublishedArticles/:authorEmail",
  getAuthorID,
  articlesCache.getPublishedArticlesCache,
  articlesCtrl.getPublishedArticles
);

/**
 * @swagger
 * /articles/getDraftArticles:
 *  get:
 *    summary: get draft article
 *    parameters:
 *      - name : p
 *        in: query
 *        required: false
 *        schema:
 *          type: number
 *          default: 0
 *        description:  the actual page number
 *      - name : limit
 *        in: query
 *        required: false
 *        schema:
 *          type: number
 *          default: 5
 *        description: limit the article list returned
 *    tags:
 *      - articles
 *    description: get fraft article of user
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: success
 *      401:
 *        description: unauthorized, token expired or undefined
 *      500:
 *        description: server error
 */

router.get(
  "/getDraftArticles",
  auth.verifyToken(process.env.SECRET_KEY),
  articlesCache.getDraftArticlesCache,
  articlesCtrl.getDraftArticles
);

/**
 * @swagger
 * /articles/getArticleById/{id}:
 *  get:
 *    summary: get one article
 *    tags:
 *      - articles
 *    description: get one article by his id
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: article's id
 *    responses:
 *      200:
 *        description: success
 *      404:
 *        description: article not found
 *      500:
 *        description: server error
 */
router.get("/getArticleById/:id", articlesCtrl.getArticleById);

/**
 * @swagger
 * /articles/getArticleByTitle/{articleTitle}:
 *  get:
 *    summary: get one article
 *    tags:
 *      - articles
 *    description: get one article by his title
 *    parameters:
 *      - name: articleTitle
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: article's title
 *    responses:
 *      200:
 *        description: success
 *      404:
 *        description: article not found
 *      500:
 *        description: server error
 */
router.get("/getArticleByTitle/:articleTitle", articlesCtrl.getArticleByTitle);

/**
 * @swagger
 * /articles/updateArticle/{id}:
 *  put:
 *    summary: edited article
 *    tags:
 *      - articles
 *    description: update article
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: article's id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Article"
 *    responses:
 *      200:
 *        description: article updated
 *      401:
 *        description: unauthorized, token expired or undefined
 *      500:
 *        description: server error
 */
router.put(
  "/updateArticle/:id",
  auth.verifyToken(process.env.SECRET_KEY),
  articlesCtrl.updateArticle
);

/**
 * @swagger
 * /articles/addComment/{id}:
 *  put:
 *    summary: add new comment
 *    tags:
 *      - articles
 *    description: client can add comment to author's article
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: article's id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - comment
 *            properties:
 *              username:
 *                type: string
 *                example: jean de dieu
 *              email:
 *                type: string
 *                example: jeandedieuseesou@gmail.com
 *              comment:
 *                type: string
 *                example: VERY GOOD ARTICLE !!
 *    responses:
 *      200:
 *        description: article updated
 *      400:
 *        description: invalid email
 *      500:
 *        description: server error
 */
router.put("/addComment/:id", verifyEmail, articlesCtrl.addComment);

/**
 * @swagger
 * /articles/deleteArticle/{id}:
 *  delete:
 *    summary: delete article
 *    tags:
 *      - articles
 *    description: delete one article by his id
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: article's id
 *    responses:
 *      200:
 *        description: success
 *      500:
 *        description: server error
 */
router.delete(
  "/deleteArticle/:id",
  auth.verifyToken(process.env.SECRET_KEY),
  articlesCtrl.deleteArticle
);

module.exports = router;
