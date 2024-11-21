const {
  controller: {
    createProject,
    findProjects,
    findOneProject,
    deleteProject,
    updateProject,
  },
} = require("../../api/v1/projects");

const router = require("express").Router();

router.get("/", findProjects);
router.post("/", createProject);
router.get("/:id", findOneProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
