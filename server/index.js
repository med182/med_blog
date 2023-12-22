const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");

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

const transporter = nodemailer.createTransport({
  service: "Mailtrap",
  auth: {
    user: "404b2c10747e03",
    pass: "4d29eeb9dee790",
  },
});

db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log("Server running on port 8000");
  });
});
