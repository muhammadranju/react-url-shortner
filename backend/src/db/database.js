const mongoose = require("mongoose");

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connection Successfully");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = databaseConnection;
