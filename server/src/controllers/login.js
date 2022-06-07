const AuthenticationController = require("../AuthenticationController");

module.exports = (app, db) => {
	app.post("/login", AuthenticationController.login);
};

//export default login;
