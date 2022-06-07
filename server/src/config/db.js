import { Sequelize } from "sequelize";
import env from "./env";

const sequelize = new Sequelize(
	env.DATABASE_NAME,
	env.DATABASE_USERNAME,
	env.DATABASE_PASSWORD,
	{
		host: env.DATABASE_HOST,
		dialect: env.DATABASE_DIALECT,
		logging: false,
		define: {
			underscored: true,
		},
	}
);

//Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require("../models/User")(sequelize, Sequelize);

export default db;
