"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = _interopRequireDefault(require("./users"));

//import app from "../app";
//import login from "./login";
var routes = [_users["default"]];

var router = function router(app, db) {
  return routes.forEach(function (route, i) {
    //console.log("route>>>", route, i);
    route(app, db);
  });
};

var _default = router;
exports["default"] = _default;