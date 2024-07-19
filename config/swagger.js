const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Personal Blog API",
    version: "1.0.0",
    description: "A RESTful API that would power a personal blog",
  },
  servers: [
    {
      url: "http://localhost:5000/",
      description: "local server",
    },
  ],
  tags: [
    {
      name: "users",
      description: "endpoints about users",
    },
    {
      name: "articles",
      description: "endpoints about articles",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: Object,
        properties: {
          username: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
          },
          password: {
            type: String,
            required: true,
          },
        },
      },
      Article: {
        type: Object,
        properties: {
          title: {
            type: String,
            required: true,
            example: "new article",
          },

          description: {
            type: String,
            required: true,
            example: "this is new article",
          },
          published: {
            type: Boolean,
            default: false,
          },
          imageUrl: {
            type: String,
            default: "",
          },
          content: {
            type: String,
            required: true,
            example: "new article to test the endpoint",
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};

module.exports = swaggerDocs;
