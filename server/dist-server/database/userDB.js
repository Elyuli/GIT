"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbUpdateUser = exports.dbPostOneUser = exports.dbGetOneUserByUsername = exports.dbGetOneUser = exports.dbGetAllUsers = exports.dbDeleteOneUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = _interopRequireDefault(require("../config/db"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var saltRounds = 8;

var dbGetAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var userData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _db["default"].users.findAll();

          case 3:
            userData = _context.sent;
            return _context.abrupt("return", userData);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            throw {
              status: 500,
              message: _context.t0
            };

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function dbGetAllUsers() {
    return _ref.apply(this, arguments);
  };
}();

exports.dbGetAllUsers = dbGetAllUsers;

var dbGetOneUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _db["default"].users.findOne({
              where: {
                id: id
              }
            });

          case 3:
            user = _context2.sent;

            if (id) {
              _context2.next = 6;
              break;
            }

            throw {
              status: 400,
              message: "No se pudo encontrar el id '".concat(id, "'")
            };

          case 6:
            return _context2.abrupt("return", user);

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            throw {
              status: (_context2.t0 === null || _context2.t0 === void 0 ? void 0 : _context2.t0.status) || 500,
              message: (_context2.t0 === null || _context2.t0 === void 0 ? void 0 : _context2.t0.message) || _context2.t0
            };

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function dbGetOneUser(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.dbGetOneUser = dbGetOneUser;

var dbGetOneUserByUsername = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(username) {
    var user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _db["default"].users.findOne({
              where: {
                username: username
              }
            });

          case 3:
            user = _context3.sent;

            if (username) {
              _context3.next = 6;
              break;
            }

            throw {
              status: 400,
              message: "No se pudo encontrar el username '".concat(username, "'")
            };

          case 6:
            return _context3.abrupt("return", user);

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            throw {
              status: (_context3.t0 === null || _context3.t0 === void 0 ? void 0 : _context3.t0.status) || 500,
              message: (_context3.t0 === null || _context3.t0 === void 0 ? void 0 : _context3.t0.message) || _context3.t0
            };

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function dbGetOneUserByUsername(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.dbGetOneUserByUsername = dbGetOneUserByUsername;

var dbPostOneUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(newUser) {
    var username, password, isAlreadyAdded, createdUser;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            username = newUser.username, password = newUser.password; //console.log("password", password);
            //console.log("username>>", username);

            isAlreadyAdded = _db["default"].users.findOne({
              where: {
                username: username
              }
            }) > -1;

            if (!isAlreadyAdded) {
              _context4.next = 4;
              break;
            }

            throw {
              status: 400,
              message: "Usuario con el username '".concat(username, "' ya existe")
            };

          case 4:
            newUser.password = _bcryptjs["default"].hashSync("".concat(password), saltRounds);
            _context4.prev = 5;
            _context4.next = 8;
            return _db["default"].users.create(newUser);

          case 8:
            createdUser = _context4.sent;
            return _context4.abrupt("return", createdUser);

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](5);
            throw {
              status: _context4.t0.status || 500,
              message: _context4.t0.message || _context4.t0
            };

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[5, 12]]);
  }));

  return function dbPostOneUser(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

exports.dbPostOneUser = dbPostOneUser;

var dbUpdateUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id, body) {
    var username, userForUpdate, userUpdated;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            //console.log("username>>>", body.username);
            username = body.username;
            _context5.prev = 1;

            if (body.password) {
              body.password = _bcryptjs["default"].hashSync("".concat(body.password), saltRounds);
            }

            _context5.next = 5;
            return _db["default"].users.findOne({
              where: {
                username: username
              }
            });

          case 5:
            userForUpdate = _context5.sent;

            if (userForUpdate) {
              _context5.next = 8;
              break;
            }

            throw {
              status: 400,
              message: "No se pudo encontrar un usuario con el username'".concat(username, "'")
            };

          case 8:
            _context5.next = 10;
            return userForUpdate.update(body);

          case 10:
            userUpdated = _context5.sent;
            return _context5.abrupt("return", userUpdated);

          case 14:
            _context5.prev = 14;
            _context5.t0 = _context5["catch"](1);
            throw {
              status: (_context5.t0 === null || _context5.t0 === void 0 ? void 0 : _context5.t0.status) || 500,
              message: (_context5.t0 === null || _context5.t0 === void 0 ? void 0 : _context5.t0.message) || _context5.t0
            };

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 14]]);
  }));

  return function dbUpdateUser(_x4, _x5) {
    return _ref5.apply(this, arguments);
  };
}();

exports.dbUpdateUser = dbUpdateUser;

var dbDeleteOneUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(username) {
    var userForDelete;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _db["default"].users.findOne({
              where: {
                username: username
              }
            });

          case 3:
            userForDelete = _context6.sent;

            if (userForDelete) {
              _context6.next = 6;
              break;
            }

            throw {
              status: 400,
              message: "No se pudo encontrar un usuario con el username'".concat(username, "'")
            };

          case 6:
            _db["default"].users.destroy({
              where: {
                username: username
              }
            });

            _context6.next = 12;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            throw {
              status: (_context6.t0 === null || _context6.t0 === void 0 ? void 0 : _context6.t0.status) || 500,
              message: (_context6.t0 === null || _context6.t0 === void 0 ? void 0 : _context6.t0.message) || _context6.t0
            };

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 9]]);
  }));

  return function dbDeleteOneUser(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

exports.dbDeleteOneUser = dbDeleteOneUser;