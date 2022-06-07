"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _env = _interopRequireDefault(require("./env"));

var sequelize = new _sequelize.Sequelize(_env["default"].DATABASE_NAME, _env["default"].DATABASE_USERNAME, _env["default"].DATABASE_PASSWORD, {
  host: _env["default"].DATABASE_HOST,
  dialect: _env["default"].DATABASE_DIALECT,
  logging: false,
  define: {
    underscored: true
  }
}); //Connect all the models/tables in the database to a db object,
//so everything is accessible via one object

var db = {};
db.Sequelize = _sequelize.Sequelize;
db.sequelize = sequelize; //Models/tables

db.users = require("../models/User")(sequelize, _sequelize.Sequelize);
var _default = db;
exports["default"] = _default;