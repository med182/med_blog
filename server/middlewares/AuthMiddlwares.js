// const { verify } = require("jsonwebtoken");

// const validateToken = (requiredRole) => (req, res, next) => {
//   const accessToken = req.header("accessToken");

//   if (!accessToken)
//     return res.status(401).json({ error: "User not logged in!" });

//   try {
//     const validToken = verify(accessToken, "importantsecret");
//     if (!validToken) {
//       return res.status(401).json({ error: "Invalid token." });
//     }

//     // Vérifiez le rôle si spécifié
//     if (requiredRole && validToken.role !== requiredRole) {
//       return res.status(403).json({ error: "Permission denied." });
//     }

//     req.user = validToken;
//     return next(); // Passer au middleware suivant si le jeton est valide et que le rôle est correct
//   } catch (err) {
//     console.error("Token verification error:", err);
//     return res.status(500).json({ error: "Internal server error." });
//   }
// };

// module.exports = validateToken;

const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
