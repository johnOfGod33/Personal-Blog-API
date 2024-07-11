const express = require("express");
const connectionDb = require("./middlewares/dbConfig");
const usersRoute = require("./routes/usersRoute");
const articlesRoute = require("./routes/articlesRoute");
const app = express();

connectionDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("database connected");
      console.log("server connected");
    });
  }
});

app.use("/users", usersRoute);
app.use("/articles", articlesRoute);
