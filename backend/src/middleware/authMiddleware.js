const jwt = require("jsonwebtoken");
const User = require("../models/user.model/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Extract token from the "Authorization" header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided!" });
    }

    // 2. Remove "Bearer " prefix
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    // 3. Verify Access Token
    let decoded;
    try {
      // eslint-disable-next-line no-undef
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        // Access token expired
        return res
          .status(403)
          .json({ message: "Access token expired. Please refresh." });
      }
      return res.status(403).json({ message: "Invalid token!" });
    }

    // 4. Find the user in the database
    const user = await User.findById(decoded.id).select(
      "id email name photoURL refreshToken"
    );
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "User not found. Unauthorized!" });
    }

    // 5. Attach user payload to request
    req.user = {
      id: user.id,
      email: user.email,
      displayName: user.name,
      photoURL: user.photoURL,
      refreshToken: user.refreshToken,
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in authMiddleware:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = authMiddleware;
