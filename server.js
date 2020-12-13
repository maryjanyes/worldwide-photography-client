const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);
server.listen(3001, () => {
  console.log("WorldwidePhotography client_app is up and running.");
  app.use(express.static("./dist"));
});

module.exports = app;
