require("dotenv").config(); // load environment variables
const http = require("http"); // create http server
const app = require("./src/app"); // create app
const databaseConnection = require("./src/db/database"); // connect to database
const config = require("./src/config/config"); // load environment variables

databaseConnection(); // connect to database

const port = config.PORT ?? 3000; // set port
const createServer = http.createServer(app); // create server

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Healthy" });
});

// start server
createServer.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
