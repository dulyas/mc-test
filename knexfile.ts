import * as dotenv from "dotenv";
dotenv.config();

module.exports = {
	production: {
		client: process.env.DB_CLIENT,
		connection: {
			database: process.env.DB_DATABASE,
			user: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
		},
		pool: {
			min: 2,
			max: 10,
		},
	},
};
