const express = require("express");
const usersCtrl = require("../controllers/usersController");
const verifyEmail = require("../middlewares/verifyEmail");
const router = express.Router();

/**
@swagger
 * /users/signup:
 *  post:
 *      summary: Create a new user
 *      tags:
 *          - users
 *      description: Create a new user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/User"
 *      responses:
 *          201:
 *              description: User created
 *          400:
 *              description: User already exists or invalid email
 *          500:
 *              description: server error 
 */
router.post("/signup", verifyEmail, usersCtrl.signup);

/**
@swagger
 * /users/login:
 *  post:
 *      summary: user's authentication
 *      tags:
 *          - users
 *      description: authenticate user and send token if operation success
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - inputPassword
 *                      properties:
 *                          email:
 *                              type: string
 *                          inputPassword:
 *                              type: string
 *      responses:
 *          201:
 *              description: success and token created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              token:
 *                                  type: string
 *                                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjY2OTY1YWMzYjAzY2NkNTVkZmY2NzM2ZiIsImlhdCI6MTcyMTIyNDI2OCwiZXhwIjoxNzIxMjMxNDY4fQ.XZ1sUBzvoxhMNlDtrvirWgdnhQWK4U0Gem0E1WgRqkI
 *          401: 
 *              description: unauthorized, password or email incorrect
 *          404:
 *              description: user not found or password and email incorrect
 *          
 *               
 */
router.post("/login", usersCtrl.login);

module.exports = router;
