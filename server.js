const http = require("http");
const express = require("express");
require('dotenv').config();

const app = express();
const server = http.createServer(app);

server.listen(process.env.APP_PORT, () => {
  console.log("WorldwidePhotography client_app is up and running.");
  app.use(express.static("./dist"));
});

module.exports = app;
