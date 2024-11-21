const Project = require("../../../../models/project.model/project.model");
const asyncHandler = require("../../../../utils/asyncHandler");

const updateProject = asyncHandler(async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const {
      title,
      details,
      category,
      author,
      liveLink,
      sourceCode,
      image,
      tags,
      avatar,
    } = req.body;
    project.title = title ?? project.title;
    project.details = details ?? project.details;
    project.category = category ?? project.category;
    project.author = author ?? project.author;
    project.liveLink = liveLink ?? project.liveLink;
    project.sourceCode = sourceCode ?? project.sourceCode;
    project.image = image ?? project.image;
    project.tags = tags ?? project.tags;
    project.avatar = avatar ?? project.avatar;
    await project.save();
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
});

module.exports = updateProject;
