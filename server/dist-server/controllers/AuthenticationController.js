"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = _interopRequireDefault(require("../config/db"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _env = _interopRequireDefault(require("../config/env"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var saltRounds = 8;

function jwtSignUser(user) {
  var ONE_WEEK = 60 * 60 * 24 * 7;
  return _jsonwebtoken["default"].sign(user, _env["default"].authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  });
}

module.exports = {
  register: function register(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var email, role, password, user;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              //console.log(req.body);
              email = req.body.email;
              role = req.body.role;
              password = req.body.password;
              _context.prev = 3;
              _context.next = 6;
              return _db["default"].users.create({
                email: email,
                role: role,
                password: password
              });

            case 6:
              user = _context.sent;
              res.json(user);
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](3);
              res.status(400).send({
                error: "".concat(_context.t0.message)
              });

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 10]]);
    }))();
  },
  login: function login(req, res) {
    //try {
    var _req$body = req.body,
        username = _req$body.username,
        password = _req$body.password,
        role = _req$body.role; //console.log("email-password", `${email}-${password}`);

    _db["default"].users.findOne({
      where: {
        username: username
      }
    }).then(function (user) {
      if (!user) {
        return res.status(403).send({
          error: " Username inválido!!!"
        });
      }

      if (user.role === "disabled") {
        return res.status(403).send({
          error: " Usuario con el rol inhabilitado!!!"
        });
      }

      if (!_bcryptjs["default"].compareSync(password.toString(), user.password)) {
        return res.status(403).send({
          error: " Contraseña inválida!!!"
        });
      }

      var userJson = user.toJSON();
      var token = jwtSignUser(userJson); //console.log("token-login:", token);

      res.header("x-auth", token).send({
        user: userJson,
        token: token
      });
    })["catch"](function (error) {
      console.log("error", error);
      res.status(500).send({
        error: "Ocurrió un error tratando de loguearse"
      });
    });
  },
  verificaRol: function verificaRol(req, res, next) {
    console.log("rol>>>>>>>", req.body);
    var rol = req.users.role;

    if (rol !== "admin") {
      return res.status(401).json({
        mensaje: "Rol no autorizado!"
      });
    }

    next();
  }
};