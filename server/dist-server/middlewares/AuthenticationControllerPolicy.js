"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var Joi = require("@hapi/joi");

/* let register = (req, res, next) => {
	const roles = ["admin", "user", "disabled"];

	const schema = Joi.object({
		email: Joi.string().email().min(6).max(256).required(),
		//role: Joi.string().required().allow("admin, user, disabled"),
		role: Joi.any().valid(...roles),
		password: Joi.string()
			.required()
			.pattern(new RegExp("^[a-zA-Z0-9]{8,32}$")),
	});

	const { error, value } = schema.validate(req.body);

	if (error) {
		switch (error.details[0].context.key) {
			case "email":
				res.status(400).send({
					error: "Necesita una dirección email válida",
				});
				break;

			case "role":
				res.status(400).send({
					error: "Los roles válidos son los siguientes: admin, user, disabled",
				});
				break;

			case "password":
				res.status(400).send({
					error: `El password debe cumplir las siguientes reglas:
                    
                    1.SOLO debe tener los siguientes carácteres: minúsculas, mayúsculas, números.
                    
                    2.Debe tener como mínimo 8 carácteres y no más de 32 carácteres`,
				});
				break;

			default:
				res.status(400).send({
					error: "Información del registro inválida",
				});
				break;
		}
	} else {
		next();
	}
}; */
var verificarAuth = function verificarAuth(req, res, next) {
  // Leer headers
  var token = req.get("token");
  var auth = req.header("x-auth"); //let token = req.get("x-auth");
  //console.log('token>>', token)
  //console.log("auth>>", auth);
  //console.log("req>>>>", req);
  // jwt.verify(token, 'secret', (err, decoded) => {
  // if(err) {
  //   return res.status(401).json({
  //     mensaje: 'Error de token',
  //     err
  //   })
  // }
  // // Creamos una nueva propiedad con la info del usuario
  // req.usuario = decoded.data; //data viene al generar el token en login.js

  next(); // });
};

var verificaRol = function verificaRol(req, res, next) {// let rol = req.usuario.role;
  // //let rol = req.usuario;
  // console.log('rol>>>>>>>', rol)
  // if( rol !== 'admin' ) {
  //   return res.status(401).json({
  //     mensaje: 'Rol no autorizado!'
  //   })
  // }
  // next();
};

module.exports = {
  register: register,
  verificarAuth: verificarAuth,
  verificaRol: verificaRol
};