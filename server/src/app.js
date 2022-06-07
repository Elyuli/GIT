import express from "express";
import env from "./config/env";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import db from "./config/db";

import router from "./routes/index";

const app = express();
const port = env.PORT;

//Middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

//Routes
router(app, db);

try {
	db.sequelize.sync().then(() => {
		app.listen(port, () => {
			console.log("Express listening on port:", port);
		});
	});
} catch (error) {
	console.log("error>>>", error);
}

export default app;
