import config from "@/config";
import moment from 'moment'
import { types } from 'pg'

types.setTypeParser(types.builtins.DATE, val => moment(val).format('YYYY-MM-DD'));
types.setTypeParser(types.builtins.TIME, val => moment(val).format('HH:mm:ss'));
types.setTypeParser(types.builtins.TIMETZ, val => moment(val).format('HH:mm:ss'));
types.setTypeParser(types.builtins.TIMESTAMP, val => moment(val).format('YYYY-MM-DD HH:mm:ss'));
types.setTypeParser(types.builtins.TIMESTAMPTZ, val => moment(val).format('YYYY-MM-DD HH:mm:ss'));


export default {
	development: {
		client: config.db.client,
		connection: {
			database: config.db.database,
			user: config.db.username,
			password: config.db.password,
		},
		pool: {
			min: 2,
			max: 10,
		},
	},
	
};
