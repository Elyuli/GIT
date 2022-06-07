import db from "../config/db";
import jwt from "jsonwebtoken";
import env from "../config/env";
import bcrypt from "bcryptjs";
const saltRounds = 8;

function jwtSignUser(user) {
	const ONE_WEEK = 60 * 60 * 24 * 7;
	return jwt.sign(user, env.authentication.jwtSecret, {
		expiresIn: ONE_WEEK,
	});
}

module.exports = {
	async register(req, res) {
		//console.log(req.body);
		const email = req.body.email;
		const role = req.body.role;
		const password = req.body.password;
		try {
			const user = await db.users.create({
				email: email,
				role: role,
				password: password,
			});
			res.json(user);
		} catch (error) {
			res.status(400).send({
				error: `${error.message}`,
			});
		}
	},
	login(req, res) {
		//try {
		const { username, password, role } = req.body;
		//console.log("email-password", `${email}-${password}`);

		db.users
			.findOne({
				where: { username: username },
			})
			.then((user) => {
				if (!user) {
					return res.status(403).send({
						error: " Username inválido!!!",
					});
				}

				if (user.role === "disabled") {
					return res.status(403).send({
						error: " Usuario con el rol inhabilitado!!!",
					});
				}

				if (!bcrypt.compareSync(password.toString(), user.password)) {
					return res.status(403).send({
						error: " Contraseña inválida!!!",
					});
				}

				const userJson = user.toJSON();
				const token = jwtSignUser(userJson);
				//console.log("token-login:", token);
				res.header("x-auth", token).send({
					user: userJson,
					token: token,
				});
			})
			.catch((error) => {
				console.log("error", error);
				res.status(500).send({
					error: "Ocurrió un error tratando de loguearse",
				});
			});
	},
	verificaRol(req, res, next) {
		console.log("rol>>>>>>>", req.body);
		let rol = req.users.role;
		if (rol !== "admin") {
			return res.status(401).json({
				mensaje: "Rol no autorizado!",
			});
		}
		next();
	},
};
