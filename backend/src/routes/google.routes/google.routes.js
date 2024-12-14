/* eslint-disable no-undef */
const router = require("express").Router();

const passport = require("passport");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../../middleware/authMiddleware");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     session: false,
//     failureRedirect: "/",
//   }),
//   (req, res) => {
//     const token = jwt.sign(
//       { id: req.user.id, email: req.user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "30d" }
//     );

//     res.redirect(`${process.env.FRONTEND_URL}/register?token=${token}`);
//   }
// );

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

    const token = jwt.sign(
      { id: req.user.id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // Redirect to frontend with the token
    res.redirect(`${process.env.FRONTEND_URL}/register?token=${token}`);
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

module.exports = router;
