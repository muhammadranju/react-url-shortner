const { Schema, model } = require("mongoose");

const authSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model("User", authSchema);

module.exports = User;
