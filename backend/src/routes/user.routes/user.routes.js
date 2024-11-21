const router = require("express").Router();

const userController = require("../../api/v1/user");

router.route("/v1/api/users").get(userController.findAll);
router.route("/v1/api/users").post(userController.create);
router.route("/v1/api/users/:id").get(userController.findOne);
router.route("/v1/api/users/:id").put(userController.update);
router.route("/v1/api/users/:id").delete(userController.deleteUser);

module.exports = router;
