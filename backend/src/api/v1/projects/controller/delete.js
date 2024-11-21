const Project = require("../../../../models/project.model/project.model");
const asyncHandler = require("../../../../utils/asyncHandler");

const deleteProject = asyncHandler(async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    await project.remove();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
});

module.exports = deleteProject;
