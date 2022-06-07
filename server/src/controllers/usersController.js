const {
	serviceGetAllUsers,
	serviceGetOneUser,
	serviceGetOneUserByUsername,
	serviceCreateNewUser,
	serviceUpdateOneUser,
	serviceDeleteOneUser,
} = require("../services/userService");
import { body, validationResult } from "express-validator";

const getAllUsers = async (req, res) => {
	const allUsers = await serviceGetAllUsers();
	//console.log("allUsers", allUsers);
	try {
		res.send({ status: "OK", data: allUsers });
	} catch (error) {
		res.status(error?.status || 500).send({ error: error?.message || error });
	}
};

const getOneUser = async (req, res) => {
	const {
		params: { userId },
	} = req;
	//console.log("userId", userId);

	if (!userId) {
		res.status(400).send({
			status: "FAILED",
			data: { error: "Parametro ':userId' no puede estar vacío" },
		});
	}
	try {
		const user = await serviceGetOneUser(userId);
		res.send({ status: "OK", data: user });
	} catch (error) {
		res
			.status(error?.status || 500)
			.send({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const getOneUserByUsername = async (req, res) => {
	const {
		params: { username },
	} = req;
	//console.log("userId", userId);

	if (!username) {
		res.status(400).send({
			status: "FAILED",
			data: { error: "Parametro: 'username' no puede estar vacío" },
		});
	}
	try {
		const user = await serviceGetOneUserByUsername(username);
		res.send({ status: "OK", data: user });
	} catch (error) {
		res
			.status(error?.status || 500)
			.send({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const createNewUser = async (req, res) => {
	const { body } = req;

	if (!body.username || !body.role || !body.password) {
		res.status(400).send({
			status: "FAILED",
			data: {
				error:
					"una de las siguientes llaves está vacía: 'username', 'role', 'password'",
			},
		});
		return;
	}
	const newUser = {
		username: body.username,
		role: body.role,
		password: body.password,
	};

	//console.log("newUser", newUser);

	try {
		const createdUser = await serviceCreateNewUser(newUser);
		res.status(201).send({ status: "OK", data: createdUser });
	} catch (error) {
		res
			.status(error?.status || 500)
			.send({ status: "FAILED", data: { error: error.message || error } });
	}
};

const updateOneUser = async (req, res) => {
	const {
		params: { userId },
		body,
	} = req;

	if (!userId)
		res.status(400).send({
			status: "FAILED",
			data: { error: "Parámetro ':userId no puede estar vacío" },
		});

	try {
		const updatedUser = await serviceUpdateOneUser(userId, body);
		res.send({ status: "OK", data: updatedUser });
	} catch (error) {
		res.status(error?.status || 500).send({ error: error?.message || error });
	}
};

const deleteOneUser = async (req, res) => {
	const {
		params: { userId },
	} = req;

	if (!userId)
		res.status(400).send({
			status: "FAILED",
			data: { error: "Parámetro ':userId no puede estar vacío" },
		});

	try {
		await serviceDeleteOneUser(userId);
		res.status(204).send({ status: "OK" });
	} catch (error) {
		res
			.status(error?.status || 500)
			.send({ status: "FAILED", data: { error: error?.message || error } });
	}
};

export {
	getAllUsers,
	getOneUser,
	getOneUserByUsername,
	createNewUser,
	updateOneUser,
	deleteOneUser,
};
