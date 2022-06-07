"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _env = _interopRequireDefault(require("./config/env"));

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _db = _interopRequireDefault(require("./config/db"));

var _index = _interopRequireDefault(require("./routes/index"));

var app = (0, _express["default"])();
var port = _env["default"].PORT; //Middlewares

app.use((0, _cors["default"])());
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, "../public"))); //Routes

(0, _index["default"])(app, _db["default"]);

try {
  _db["default"].sequelize.sync().then(function () {
    app.listen(port, function () {
      console.log("Express listening on port:", port);
    });
  });
} catch (error) {
  console.log("error>>>", error);
}

var _default = app;
exports["default"] = _default;