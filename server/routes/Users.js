const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddlwares");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
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
    res.json({ token:accessToken, username: username, id : user.id });
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/basicinfo/:id", async(req,res)=>{
const id= req.params.id;

const basicInfo=await Users.findByPk(id, {attributes: {exclude: ["password"]}

})
res.json(basicInfo)
})


module.exports = router;
