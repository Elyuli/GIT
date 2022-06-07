const env = {
	PORT: "5000",
	DATABASE_NAME: process.env.DATABASE_NAME || "geoserver",
	DATABASE_HOST: process.env.DATABASE_HOST || "localhost",
	DATABASE_USERNAME: process.env.DATABASE_USERNAME || "postgres",
	DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || "postgres",
	DATABASE_PORT: process.env.DATABASE_PORT || 5432,
	DATABASE_DIALECT: process.env.DATABASE_DIALECT || "postgres",

	NODE_ENV: process.env.NODE_ENV || "development",
	authentication: {
		jwtSecret: process.env.JWT_SECRET || "secret",
	},
};

export default env;
