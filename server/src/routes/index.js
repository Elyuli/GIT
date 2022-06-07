//import app from "../app";
import userRoutes from "./users";
//import login from "./login";

const routes = [userRoutes];

const router = (app, db) => {
	return routes.forEach((route, i) => {
		//console.log("route>>>", route, i);
		route(app, db);
	});
};

export default router;
