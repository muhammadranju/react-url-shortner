const router = require("express").Router();
const urlController = require("../api/v1/url");
const settingRoutes = require("./setting.routes/setting.routes");

router.route("/v1/api/short-urls").get(urlController.findAll);
router.route("/v1/api/short-urls").post(urlController.create);
router.route("/v1/api/short-urls/:id").get(urlController.findOne);
router.route("/v1/api/short-urls/:id").patch(urlController.update);
router.route("/v1/api/short-urls/:id").delete(urlController.deleteShortUrl);

router.route("/v1/api/short-urls/:id").delete(urlController.deleteShortUrl);

router.use("/setting", settingRoutes);

module.exports = router;
