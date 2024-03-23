const express = require("express");
const app = express();
const cors = require("cors");
const validateToken = require("./middlewares/AuthMiddlwares");

// const path = require("path");

app.use(express.json());
app.use(cors());

const db = require("./models");

const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const commentRouter = require("./routes/Comments");
app.use("/comments", commentRouter);

const userRouter = require("./routes/Users");
app.use("/auth", userRouter);

const likeRouter = require("./routes/Likes");
app.use("/likes", likeRouter);

db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log("Server running on port 8000");
  });
});
