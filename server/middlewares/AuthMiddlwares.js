const { verify } = require("jsonwebtoken");

const validateToken = (requiredRole) => (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken)
    return res.json({ error: "L'utilisateur n'est pas connecté!" });

  try {
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken;

    if (!validToken) {
      return res.json({ error: "Token invalide." });
    }

    // Vérifiez le rôle si spécifié
    if (requiredRole && validToken.role !== requiredRole) {
      return res.status(403).json({ error: "Permission refusée." });
    }

    return next();
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
