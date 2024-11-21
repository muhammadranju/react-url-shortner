const findProjects = require("./find");
const createProject = require("./create");
const updateProject = require("./update");
const deleteProject = require("./delete");
const findOneProject = require("./findOne");

module.exports = {
  findProjects,
  findOneProject,
  createProject,
  updateProject,
  deleteProject,
};
