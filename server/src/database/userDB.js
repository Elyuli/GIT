import db from "../config/db";
import bcrypt from "bcryptjs";

const saltRounds = 8;

const dbGetAllUsers = async () => {
	try {
		const userData = await db.users.findAll();
		//console.log("userData", userData);
		return userData;
	} catch (error) {
		throw { status: 500, message: error };
	}
};

const dbGetOneUser = async (id) => {
	try {
		const user = await db.users.findOne({
			where: { id: id },
		});

		if (!id) {
			throw {
				status: 400,
				message: `No se pudo encontrar el id '${id}'`,
			};
		}
		return user;
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

const dbGetOneUserByUsername = async (username) => {
	try {
		const user = await db.users.findOne({
			where: { username: username },
		});

		if (!username) {
			throw {
				status: 400,
				message: `No se pudo encontrar el username '${username}'`,
			};
		}
		return user;
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

const dbPostOneUser = async (newUser) => {
	const { username, password } = newUser;
	//console.log("password", password);
	//console.log("username>>", username);

	const isAlreadyAdded =
		db.users.findOne({ where: { username: username } }) > -1;

	if (isAlreadyAdded) {
		throw {
			status: 400,
			message: `Usuario con el username '${username}' ya existe`,
		};
	}

	newUser.password = bcrypt.hashSync(`${password}`, saltRounds);

	try {
		const createdUser = await db.users.create(newUser);
		return createdUser;
	} catch (error) {
		throw { status: error.status || 500, message: error.message || error };
	}
};

const dbUpdateUser = async (id, body) => {
	//console.log("username>>>", body.username);
	const { username } = body;
	try {
		if (body.password) {
			body.password = bcrypt.hashSync(`${body.password}`, saltRounds);
		}

		const userForUpdate = await db.users.findOne({
			where: { username: username },
		});

		if (!userForUpdate) {
			throw {
				status: 400,
				message: `No se pudo encontrar un usuario con el username'${username}'`,
			};
		}

		const userUpdated = await userForUpdate.update(body);

		return userUpdated;
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

const dbDeleteOneUser = async (username) => {
	try {
		const userForDelete = await db.users.findOne({
			where: { username: username },
		});

		if (!userForDelete) {
			throw {
				status: 400,
				message: `No se pudo encontrar un usuario con el username'${username}'`,
			};
		}

		db.users.destroy({
			where: { username: username },
		});
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

export {
	dbGetAllUsers,
	dbPostOneUser,
	dbGetOneUser,
	dbGetOneUserByUsername,
	dbUpdateUser,
	dbDeleteOneUser,
};
