const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddlwares");
const { sign } = require("jsonwebtoken");
const { verify } = require("jsonwebtoken");

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "404b2c10747e03",
    pass: "4d29eeb9dee790",
  },
});

router.get("/confirm/:token", async (req, res) => {
  const token = req.params.token;
  console.log("Token:", token);

  try {
    const decoded = verify(token, "votre-secret-de-confirmation");

    const user = await Users.findOne({ where: { email: decoded.email } });

    if (user) {
      await Users.update(
        { isConfirmed: true },
        { where: { email: decoded.email } }
      );
      res.redirect("http://localhost:3000/login");
    } else {
      res.status(400).json({ error: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la confirmation" });
  }
});

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
    return res.status(400).json({
      error: "Cet identifiant ou cette adresse e-mail n'est pas diponible!",
    });
  }

  const confirmationToken = sign({ email }, "votre-secret-de-confirmation", {
    expiresIn: "1d",
  });

  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      email: email,
      confirmationToken: confirmationToken,
    });

    const mailOptions = {
      from: "medblog@gmail.com",
      to: email,
      subject: "Confirmation dinscription",
      html: `Cliquez sur le lien suivant pour confirmer votre inscription :<a href="http://localhost:8000/auth/confirm/${confirmationToken}">Confirmer l'inscription</a>`,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de l'envoi de l'e-mail." });
      } else {
        console.log("E-mail de confirmation envoyé : " + info.response);

        res.json("SUCCESS");
      }
    });
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
