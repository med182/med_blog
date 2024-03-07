const express = require("express");
const router = express.Router();
const { Users, Posts, Comments } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddlwares");
// const { sign } = require("jsonwebtoken");
// const { verify } = require("jsonwebtoken");

router.get("/admin/posts", validateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Permission refusée." });
    }

    const allPosts = await Posts.findAll();

    res.json(allPosts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des posts." });
  }
});

router.get("/admin/posts", validateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Permission refusée." });
    }

    const allPosts = await Posts.findAll();

    res.json(allPosts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des posts." });
  }
});

router.delete("/admin/delete-post/:postId", validateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Permission refusée." });
    }

    const postId = req.params.postId;
    await Posts.destroy({ where: { id: postId } });

    res.json("Le post a été supprimé avec succès.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la suppression du post." });
  }
});

router.delete("/admin/delete-post/:postId", validateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Permission refusée." });
    }

    const postId = req.params.postId;
    await Posts.destroy({ where: { id: postId } });

    res.json("Le post a été supprimé avec succès.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la suppression du post." });
  }
});

router.get("/admin/users", validateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Permission refusée." });
    }

    const allUsers = await Users.findAll();

    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs." });
  }
});

router.delete("/admin/delete-user/:userId", validateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Permission refusée." });
    }

    const userId = req.params.userId;
    await Users.destroy({ where: { id: userId } });

    res.json("L'utilisateur a été supprimé avec succès.");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'utilisateur." });
  }
});

router.delete(
  "/admin/delete-comment/:commentId",
  validateToken,
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Permission refusée." });
      }

      const commentId = req.params.commentId;
      await Comments.destroy({ where: { id: commentId } });

      res.json("Le commentaire a été supprimé avec succès.");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la suppression du commentaire." });
    }
  }
);

module.exports = router;
