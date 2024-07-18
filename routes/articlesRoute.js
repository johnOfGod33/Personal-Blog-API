const express = require("express");
const auth = require("jwt-auths-module");
const articlesCtrl = require("../controllers/articlesController");
const getAuthorID = require("../middlewares/getAuthorID");
const verifyEmail = require("../middlewares/verifyEmail");
const router = express.Router();

/**
 * @swagger
 * /articles/createArticle:
 *  post:
 *    tags:
 *      - articles
 *    description: create new article
 *    parameters:
 *      - name: token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          example: bearer token
 *        description: user's token (we need to login to get the token)
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - title
 *              - description
 *              - published
 *              - content
 *            properties:
 *              title:
 *                type: string
 *                example: new article
 *              description:
 *                type: string
 *                example: this is new article
 *              published:
 *                type: boolean
 *                default: false
 *              imageUrl:
 *                type: string
 *                default: ""
 *              content:
 *                type: string
 *                example: new article to test the endpoint
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
 * /articles/getPublisedArticles/authorEmail:
 *  get:
 *    tags:
 *      - articles
 *    description: get publised article of user by his email
 *    parameters:
 *      - name: authorEmail
 *        in: path, query
 *        required: true
 *        schema:
 *          type: string
 *        description: user's email
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
  articlesCtrl.getPublishedArticles
);

/**
 * @swagger
 * /articles/getDraftArticles:
 *  get:
 *    tags:
 *      - articles
 *    description: get fraft article of user
 *    parameters:
 *      - name: token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          example: bearer token
 *        description: user's email
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
  articlesCtrl.getDraftArticles
);

/**
 * @swagger
 * /articles/getOneArticle/id:
 *  get:
 *    tags:
 *      - articles
 *    description: get one article by his id
 *    parameters:
 *      - name: id
 *        in: path, query
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
router.get("/getOneArticle/:id", articlesCtrl.getOneArticle);

/**
 * @swagger
 * /articles/updateArticle/id:
 *  put:
 *    tags:
 *      - articles
 *    description: update article
 *    parameters:
 *      - name: token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          example: bearer token
 *        description: user's token (we need to login to get the token)
 *      - name: id
 *        in: path, query
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
 *              - title
 *              - description
 *              - published
 *              - content
 *            properties:
 *              title:
 *                type: string
 *                example: new article
 *              description:
 *                type: string
 *                example: this is new article
 *              published:
 *                type: boolean
 *                default: false
 *              imageUrl:
 *                type: string
 *                default: ""
 *              content:
 *                type: string
 *                example: I update the article to test the endpoint
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
 * /articles/addComment/id:
 *  put:
 *    tags:
 *      - articles
 *    description: add comment
 *    parameters:
 *      - name: id
 *        in: path, query
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
 * /articles/delete/id:
 *  delete:
 *    tags:
 *      - articles
 *    description: delete one article by his id
 *    parameters:
 *      - name: id
 *        in: path, query
 *        required: true
 *        schema:
 *          type: string
 *        description: article's id
 *      - name: token
 *        in: header
 *        required: true
 *        schema:
 *          type: string
 *          example: bearer token
 *        description: user's token (we need to login to get the token)
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
