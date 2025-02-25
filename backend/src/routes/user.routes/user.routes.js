const router = require("express").Router();
const authMiddleware = require("../../middleware/authMiddleware");

const userController = require("../../api/v1/user");

router.route("/v1/api/users").get(authMiddleware, userController.findAll);
router.route("/v1/api/users").post(userController.create);
router.route("/v1/api/users/login").post(userController.findOne);
router.route("/v1/api/users/:userId").put(userController.update);
router.route("/v1/api/users/:userId").delete(userController.deleteUser);

module.exports = router;
