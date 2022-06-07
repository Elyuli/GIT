"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serviceUpdateOneUser = exports.serviceGetOneUserByUsername = exports.serviceGetOneUser = exports.serviceGetAllUsers = exports.serviceDeleteOneUser = exports.serviceCreateNewUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _userDB = require("../database/userDB");

var serviceGetAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var allUsers;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _userDB.dbGetAllUsers)();

          case 3:
            allUsers = _context.sent;
            return _context.abrupt("return", allUsers);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function serviceGetAllUsers() {
    return _ref.apply(this, arguments);
  };
}();

exports.serviceGetAllUsers = serviceGetAllUsers;

var serviceGetOneUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _userDB.dbGetOneUser)(id);

          case 3:
            user = _context2.sent;
            return _context2.abrupt("return", user);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function serviceGetOneUser(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.serviceGetOneUser = serviceGetOneUser;

var serviceGetOneUserByUsername = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(username) {
    var user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _userDB.dbGetOneUserByUsername)(username);

          case 3:
            user = _context3.sent;
            return _context3.abrupt("return", user);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            throw _context3.t0;

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function serviceGetOneUserByUsername(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.serviceGetOneUserByUsername = serviceGetOneUserByUsername;

var serviceCreateNewUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(newUser) {
    var userToInsert, createdUser;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userToInsert = newUser;
            _context4.prev = 1;
            _context4.next = 4;
            return (0, _userDB.dbPostOneUser)(userToInsert);

          case 4:
            createdUser = _context4.sent;
            return _context4.abrupt("return", createdUser);

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            throw _context4.t0;

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));

  return function serviceCreateNewUser(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

exports.serviceCreateNewUser = serviceCreateNewUser;

var serviceUpdateOneUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(userId, body) {
    var updatedUser;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _userDB.dbUpdateUser)(userId, body);

          case 2:
            updatedUser = _context5.sent;
            return _context5.abrupt("return", updatedUser);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function serviceUpdateOneUser(_x4, _x5) {
    return _ref5.apply(this, arguments);
  };
}();

exports.serviceUpdateOneUser = serviceUpdateOneUser;

var serviceDeleteOneUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(userId) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return (0, _userDB.dbDeleteOneUser)(userId);

          case 3:
            _context6.next = 8;
            break;

          case 5:
            _context6.prev = 5;
            _context6.t0 = _context6["catch"](0);
            throw _context6.t0;

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 5]]);
  }));

  return function serviceDeleteOneUser(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

exports.serviceDeleteOneUser = serviceDeleteOneUser;