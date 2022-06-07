"use strict";

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("Usuario", {
    username: {
      type: DataTypes.STRING,
      unique: true
      /* validate: {
      	isEmail: { message: "Entre un email válido" },
      }, */

    },
    role: {
      type: DataTypes.ENUM,
      values: ["user", "admin", "disabled"]
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return User;
};