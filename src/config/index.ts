import { config } from "dotenv";
config();



export default {
	port: process.env.PORT,
	app: process.env.APP,
	env: process.env.NODE_ENV,
	secret: process.env.APP_SECRET,
	hostname: process.env.HOSTNAME,

	db: {
		client: process.env.DB_CLIENT,
		database: process.env.DB_DATABASE,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
	},

};
