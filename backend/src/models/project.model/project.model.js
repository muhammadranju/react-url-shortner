const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    liveLink: {
      type: String,
    },
    sourceCode: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    avatar: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

projectSchema.pre("save", function (next) {
  if (this.isModified("category")) {
    this.category = this.category.split(" ").join("-").toLocaleLowerCase();
  }
  next();
});

const Project = model("Project", projectSchema);

module.exports = Project;
