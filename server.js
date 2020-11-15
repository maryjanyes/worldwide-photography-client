const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);
server.listen(3002, () => {
  console.log("WorldwidePhotography client launched.");
  app.use(express.static("./dist"));
});

module.exports = app;
