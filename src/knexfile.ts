import config from "@/config";
import { format, parseISO } from "date-fns";



export default {
	development: {
		client: config.db.client,
		connection: {
			database: config.db.database,
			user: config.db.username,
			password: config.db.password,
			typeCast: function (field: any, next: any) {
				if (field.type == "DATE") {
					try {
						return format(parseISO(field.string()), "yyyy.MM.dd");
					} catch (e) {
						return null;
					}
				}
				return next();
			},
		},
		pool: {
			min: 2,
			max: 10,
		},
	},
	
};
