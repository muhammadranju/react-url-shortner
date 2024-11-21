const Project = require("../../../../models/project.model/project.model");
const asyncHandler = require("../../../../utils/asyncHandler");

const findProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
});

module.exports = findProjects;
