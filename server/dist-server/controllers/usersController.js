"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOneUser = exports.getOneUserByUsername = exports.getOneUser = exports.getAllUsers = exports.deleteOneUser = exports.createNewUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressValidator = require("express-validator");

var _require = require("../services/userService"),
    serviceGetAllUsers = _require.serviceGetAllUsers,
    serviceGetOneUser = _require.serviceGetOneUser,
    serviceGetOneUserByUsername = _require.serviceGetOneUserByUsername,
    serviceCreateNewUser = _require.serviceCreateNewUser,
    serviceUpdateOneUser = _require.serviceUpdateOneUser,
    serviceDeleteOneUser = _require.serviceDeleteOneUser;

var getAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var allUsers;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return serviceGetAllUsers();

          case 2:
            allUsers = _context.sent;

            //console.log("allUsers", allUsers);
            try {
              res.send({
                status: "OK",
                data: allUsers
              });
            } catch (error) {
              res.status((error === null || error === void 0 ? void 0 : error.status) || 500).send({
                error: (error === null || error === void 0 ? void 0 : error.message) || error
              });
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getAllUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getAllUsers = getAllUsers;

var getOneUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var userId, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = req.params.userId; //console.log("userId", userId);

            if (!userId) {
              res.status(400).send({
                status: "FAILED",
                data: {
                  error: "Parametro ':userId' no puede estar vacío"
                }
              });
            }

            _context2.prev = 2;
            _context2.next = 5;
            return serviceGetOneUser(userId);

          case 5:
            user = _context2.sent;
            res.send({
              status: "OK",
              data: user
            });
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](2);
            res.status((_context2.t0 === null || _context2.t0 === void 0 ? void 0 : _context2.t0.status) || 500).send({
              status: "FAILED",
              data: {
                error: (_context2.t0 === null || _context2.t0 === void 0 ? void 0 : _context2.t0.message) || _context2.t0
              }
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 9]]);
  }));

  return function getOneUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getOneUser = getOneUser;

var getOneUserByUsername = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var username, user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            username = req.params.username; //console.log("userId", userId);

            if (!username) {
              res.status(400).send({
                status: "FAILED",
                data: {
                  error: "Parametro: 'username' no puede estar vacío"
                }
              });
            }

            _context3.prev = 2;
            _context3.next = 5;
            return serviceGetOneUserByUsername(username);

          case 5:
            user = _context3.sent;
            res.send({
              status: "OK",
              data: user
            });
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](2);
            res.status((_context3.t0 === null || _context3.t0 === void 0 ? void 0 : _context3.t0.status) || 500).send({
              status: "FAILED",
              data: {
                error: (_context3.t0 === null || _context3.t0 === void 0 ? void 0 : _context3.t0.message) || _context3.t0
              }
            });

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 9]]);
  }));

  return function getOneUserByUsername(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getOneUserByUsername = getOneUserByUsername;

var createNewUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var body, newUser, createdUser;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            body = req.body;

            if (!(!body.username || !body.role || !body.password)) {
              _context4.next = 4;
              break;
            }

            res.status(400).send({
              status: "FAILED",
              data: {
                error: "una de las siguientes llaves está vacía: 'username', 'role', 'password'"
              }
            });
            return _context4.abrupt("return");

          case 4:
            newUser = {
              username: body.username,
              role: body.role,
              password: body.password
            }; //console.log("newUser", newUser);

            _context4.prev = 5;
            _context4.next = 8;
            return serviceCreateNewUser(newUser);

          case 8:
            createdUser = _context4.sent;
            res.status(201).send({
              status: "OK",
              data: createdUser
            });
            _context4.next = 15;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](5);
            res.status((_context4.t0 === null || _context4.t0 === void 0 ? void 0 : _context4.t0.status) || 500).send({
              status: "FAILED",
              data: {
                error: _context4.t0.message || _context4.t0
              }
            });

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[5, 12]]);
  }));

  return function createNewUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.createNewUser = createNewUser;

var updateOneUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var userId, body, updatedUser;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            userId = req.params.userId, body = req.body;
            if (!userId) res.status(400).send({
              status: "FAILED",
              data: {
                error: "Parámetro ':userId no puede estar vacío"
              }
            });
            _context5.prev = 2;
            _context5.next = 5;
            return serviceUpdateOneUser(userId, body);

          case 5:
            updatedUser = _context5.sent;
            res.send({
              status: "OK",
              data: updatedUser
            });
            _context5.next = 12;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](2);
            res.status((_context5.t0 === null || _context5.t0 === void 0 ? void 0 : _context5.t0.status) || 500).send({
              error: (_context5.t0 === null || _context5.t0 === void 0 ? void 0 : _context5.t0.message) || _context5.t0
            });

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 9]]);
  }));

  return function updateOneUser(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateOneUser = updateOneUser;

var deleteOneUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var userId;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            userId = req.params.userId;
            if (!userId) res.status(400).send({
              status: "FAILED",
              data: {
                error: "Parámetro ':userId no puede estar vacío"
              }
            });
            _context6.prev = 2;
            _context6.next = 5;
            return serviceDeleteOneUser(userId);

          case 5:
            res.status(204).send({
              status: "OK"
            });
            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](2);
            res.status((_context6.t0 === null || _context6.t0 === void 0 ? void 0 : _context6.t0.status) || 500).send({
              status: "FAILED",
              data: {
                error: (_context6.t0 === null || _context6.t0 === void 0 ? void 0 : _context6.t0.message) || _context6.t0
              }
            });

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 8]]);
  }));

  return function deleteOneUser(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteOneUser = deleteOneUser;