import * as dotenv from "dotenv";
dotenv.config();

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

	// jwt: {
	// 	access_token_secret: process.env.ACCESS_TOKEN_SECRET || "",
	// 	access_token_expiration: process.env.ACCESS_TOKEN_EXPIRATION,
	// 	refresh_token_secret: process.env.REFRESH_TOKEN_SECRET || "",
	// 	refresh_token_expiration: process.env.REFRESH_TOKEN_EXPIRATION,
	// },

	// salesforce: {
	// 	url: process.env.SALESFORCE_URL || "/salesforce",
	// 	version: process.env.SALESFORCE_VERSION,
	// 	auth: {
	// 		host: process.env.SALESFORCE_AUTH_HOST,
	// 		url: process.env.SALESFORCE_AUTH_URL,
	// 		grant_type: process.env.SALESFORCE_AUTH_GRANT,
	// 		client_id: process.env.SALESFORCE_AUTH_CLIENT_ID,
	// 		client_secret: process.env.SALESFORCE_AUTH_CLIENT_SECRET,
	// 		username: process.env.SALESFORCE_AUTH_USERNAME,
	// 		password: process.env.SALESFORCE_AUTH_PASSWORD,
	// 	},
	// },

	// transporter: {
	// 	service: process.env.TRANSPORTER_SERVICE,
	// 	host: process.env.TRANSPORTER_HOST,
	// 	port: 587,
	// 	email: process.env.TRANSPORTER_EMAIL,
	// 	password: process.env.TRANSPORTER_PASSWORD,
	// },

	// pathAvatars: "avatars/",
	// sms: {
	// 	appsid: process.env.SMS_APPSID
	// }
};
