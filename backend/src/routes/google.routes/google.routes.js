/* eslint-disable no-undef */
const router = require("express").Router();

const passport = require("passport");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../../middleware/authMiddleware");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/generateToken");
const User = require("../../models/user.model/user.model");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/",
  }),
  (req, res) => {
    // Debug req.user to ensure it has the necessary fields

    // Validate user data before generating the token
    if (!req.user || !req.user.id || !req.user.email) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    const token = generateAccessToken({
      id: req.user._id,
      email: req.email,
    });
    const refreshToken = generateRefreshToken({
      id: req.user._id,
      email: req.user.email,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    // Redirect to frontend with the token
    res.redirect(
      `${process.env.FRONTEND_URL}/auth/register?token=${token}&refreshToken=${refreshToken}`
    );
  }
);

router.get("/verify", authMiddleware, (req, res) => {
  try {
    return res
      .status(200)
      .json({ message: "Successfully verified!", user: req.user });
  } catch (error) {
    console.log(error);
  }
});

router.post("/refresh", async (req, res) => {
  try {
    // const accessToken = req.headers["authorization"];
    // const
    const refreshToken = req.cookies.refresh_token || req.body.refreshToken;

    console.log("refresh", refreshToken);
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" }); // Unauthorized
    }

    // Verify the refresh token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res
            .status(403)
            .json({ message: "Invalid or expired refresh token" }); // Forbidden
        }

        // Optional: Check if the user still exists in the database
        const user = await User.findById(decoded.id);
        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }

        // Generate a new access token
        const newAccessToken = generateAccessToken({ id: user.id });

        return res.json({ accessToken: newAccessToken });
      }
    );
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
