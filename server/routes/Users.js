const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddlwares");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password, repeatedPassword, email } = req.body;

  if (password !== repeatedPassword) {
    return res
      .status(400)
      .json({ error: "les mots de passe ne correspondent pas" });
  }

  const exitingUser = await Users.findOne({
    where: { username: username, email: email },
  });
  if (exitingUser) {
    return res
      .status(400)
      .json({
        error: "Cet identifiant ou cette adresse e-mail n'est pas diponible!",
      });
  }
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      email: email,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    return res.json({ error: "L'utilisateur n'existe pas !" });
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      return res.json({
        error: "L'identifiant ou le mot de passe n'est pas valide !",
      });
    }
    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json({ token: accessToken, username: username, id: user.id });
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;

  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(basicInfo);
});

router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "Le mot de passe est érroné !" });

    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update(
        { password: hash },
        { where: { username: req.user.username } }
      );
      res.json("SUCCESS");
    });
  });
});

module.exports = router;
