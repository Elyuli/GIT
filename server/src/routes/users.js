import {
	getAllUsers,
	getOneUser,
	getOneUserByUsername,
	createNewUser,
	updateOneUser,
	deleteOneUser,
} from "../controllers/usersController";

import { verificaRol, login } from "../controllers/AuthenticationController";

const userRoutes = (app, db) => {
	app.get("/getAllUsers", getAllUsers);

	app.get("/getUserById/:userId", getOneUser);

	app.get("/getUserByUsername/:username", getOneUserByUsername);

	app.post("/createUser", createNewUser);

	app.put("/updateUser/:userId", updateOneUser);

	app.delete("/deleteUser/:userId", deleteOneUser);

	app.post("/login", login);
};

export default userRoutes;
