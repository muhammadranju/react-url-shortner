const Project = require("../../../../models/project.model/project.model");
const asyncHandler = require("../../../../utils/asyncHandler");

const createProject = asyncHandler(async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
});

module.exports = createProject;
