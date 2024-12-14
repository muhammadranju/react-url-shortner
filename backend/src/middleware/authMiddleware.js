/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const User = require("../models/user.model/user.model");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]; // Expecting the token in the "Authorization" header.
  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  // Remove "Bearer " if the token is prefixed
  const tokenWithoutBearer = token.startsWith("Bearer ")
    ? token.slice(7, token.length)
    : token;

  jwt.verify(
    tokenWithoutBearer,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized!" });
      }

      // Attach the decoded payload to the request object for use in subsequent middleware/routes

      const findUser = await User.findOne({ _id: decoded.id });
      const payload = {
        id: findUser.id,
        email: findUser.email,
        displayName: findUser.name,
        photoURL: findUser.photoURL,
      };

      if (findUser) {
        req.user = payload;
        next();
      } else {
        return res.status(401).json({ message: "Unauthorized!" });
      }
    }
  );
};

module.exports = authMiddleware;
