/* eslint-disable strict */
const jwt = require("jsonwebtoken");

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const token  = req.header("Authorization").replace("Bearer ", "");
  if (!token) return res.status(401).send("Acceso denegado"); // No se proporcionó token
  jwt.verify(token, "secret", (err, user) => {
    if (err) return res.status(403).send("Token invalid"); // Token inválido
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
