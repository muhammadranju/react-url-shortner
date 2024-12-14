const router = require("express").Router();
const settingRoutes = require("./setting.routes/setting.routes");
const urlRoutes = require("./url.routes/url.routes");
const userRoutes = require("./user.routes/user.routes");
const googleRoutes = require("./google.routes/google.routes");

router.use(userRoutes);
router.use(urlRoutes);
router.use("/setting", settingRoutes);
router.use(googleRoutes);

module.exports = router;
