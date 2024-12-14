/* eslint-disable no-undef */
const router = require("express").Router();
const passport = require("passport");
const settingRoutes = require("./setting.routes/setting.routes");
const urlRoutes = require("./url.routes/url.routes");
const userRoutes = require("./user.routes/user.routes");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

router.use(userRoutes);
router.use(urlRoutes);
router.use("/setting", settingRoutes);

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
    const token = jwt.sign(
      { id: req.user.id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.redirect(`${process.env.FRONTEND_URL}/register?token=${token}`);
  }
);

router.get("/verify", authMiddleware, (req, res) => {
  try {
    console.log(req.user);
    return res
      .status(200)
      .json({ message: "Successfully verified!", user: req.user });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
