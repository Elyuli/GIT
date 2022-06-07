"use strict";

var AuthenticationController = require("../AuthenticationController");

module.exports = function (app, db) {
  app.post("/login", AuthenticationController.login);
}; //export default login;