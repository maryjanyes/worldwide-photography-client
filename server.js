const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);
server.listen(3001, () => {
  console.log("WorldwidePhotography client launched.");
  app.use(express.static("./dist"));
});

module.exports = app;
