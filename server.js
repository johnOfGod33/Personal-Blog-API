require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectionDb = require("./config/dbConfig");
const swaggerDocs = require("./config/swagger");
const usersRoute = require("./routes/usersRoute");
const articlesRoute = require("./routes/articlesRoute");
const app = express();
const port = 5000 || process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/users", usersRoute);
app.use("/articles", articlesRoute);

swaggerDocs(app, port);

connectionDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log("database connected");
      console.log(`Server running on port ${port}`);
    });
  }
});
