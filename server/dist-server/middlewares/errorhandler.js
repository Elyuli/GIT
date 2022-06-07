"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var errorHandler = function errorHandler(request, response, error, next) {
  console.error("error.name>>", error);

  if (err.name === "ERR_CONNECTION_REFUSED") {
    response.json({
      status: "FAILED",
      error: error.message || error
    });
  }
};

var _default = errorHandler;
exports["default"] = _default;