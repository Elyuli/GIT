"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _usersController = require("../controllers/usersController");

var _AuthenticationController = require("../controllers/AuthenticationController");

var userRoutes = function userRoutes(app, db) {
  app.get("/getAllUsers", _usersController.getAllUsers);
  app.get("/getUserById/:userId", _usersController.getOneUser);
  app.get("/getUserByUsername/:username", _usersController.getOneUserByUsername);
  app.post("/createUser", _usersController.createNewUser);
  app.put("/updateUser/:userId", _usersController.updateOneUser);
  app["delete"]("/deleteUser/:userId", _usersController.deleteOneUser);
  app.post("/login", _AuthenticationController.login);
};

var _default = userRoutes;
exports["default"] = _default;