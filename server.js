const http = require("http");
const express = require("express");
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const port = process.env.APP_PORT || 8080;

// TODO Update to https
// and add secure keys.
server.listen(port, () => {
  console.log("Client app live on", port);
  app.use(express.static("./dist"));
  app.use("/assets", express.static("./assets"));
});

module.exports = app;
