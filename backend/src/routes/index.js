const router = require("express").Router();

const authRoutes = require("./auth.routes/auth.routes");
const projectRoutes = require("./project.routes/project.routes");
const aboutRoutes = require("./about.routes/about.routes");
const contactRoutes = require("./contact.routes/contact.routes");
const settingRoutes = require("./setting.routes/setting.routes");
const teamRoutes = require("./team.routes/team.routes");

const {
  findAll,
  create,
  findOne,
  update,
  deleteShortUrl,
} = require("../controllers");

router.route("/v1/api/short-urls").get(findAll);
router.route("/v1/api/short-urls").post(create);
router.route("/v1/api/short-urls/:id").get(findOne);
router.route("/v1/api/short-urls/:id").patch(update);
router.route("/v1/api/short-urls/:id").delete(deleteShortUrl);

router.use("/auth", authRoutes);
router.use("/project", projectRoutes);
router.use("/about", aboutRoutes);
router.use("/contact", contactRoutes);
router.use("/setting", settingRoutes);
router.use("/team", teamRoutes);

module.exports = router;
