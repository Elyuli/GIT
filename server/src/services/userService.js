import {
	dbGetAllUsers,
	dbPostOneUser,
	dbGetOneUser,
	dbGetOneUserByUsername,
	dbUpdateUser,
	dbDeleteOneUser,
} from "../database/userDB";

const serviceGetAllUsers = async () => {
	try {
		const allUsers = await dbGetAllUsers();
		return allUsers;
	} catch (error) {
		throw error;
	}
};

const serviceGetOneUser = async (id) => {
	try {
		const user = await dbGetOneUser(id);
		return user;
	} catch (error) {
		throw error;
	}
};

const serviceGetOneUserByUsername = async (username) => {
	try {
		const user = await dbGetOneUserByUsername(username);
		return user;
	} catch (error) {
		throw error;
	}
};

const serviceCreateNewUser = async (newUser) => {
	const userToInsert = newUser;

	try {
		const createdUser = await dbPostOneUser(userToInsert);

		return createdUser;
	} catch (error) {
		throw error;
	}
};

const serviceUpdateOneUser = async (userId, body) => {
	const updatedUser = await dbUpdateUser(userId, body);
	return updatedUser;
};

const serviceDeleteOneUser = async (userId) => {
	try {
		await dbDeleteOneUser(userId);
	} catch (error) {
		throw error;
	}
};

export {
	serviceGetAllUsers,
	serviceGetOneUser,
	serviceGetOneUserByUsername,
	serviceCreateNewUser,
	serviceUpdateOneUser,
	serviceDeleteOneUser,
};
