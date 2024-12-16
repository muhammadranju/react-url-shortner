const router = require("express").Router();

const urlController = require("../../api/v1/url");
const authMiddleware = require("../../middleware/authMiddleware");

router.route("/v1/api/short-urls").get(authMiddleware, urlController.findAll);
router.route("/v1/api/short-urls").post(authMiddleware, urlController.create);
router.route("/url/:shortLink").get(urlController.findOne);
// router.route("/v1/api/short-urls/:id").patch(urlController.update);
// router.route("/v1/api/short-urls/:id").delete(urlController.deleteShortUrl);

module.exports = router;
