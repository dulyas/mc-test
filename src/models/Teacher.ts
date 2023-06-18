import { Model } from "objection";



export default class Teacher extends Model {
    id!: number
    name!: string

    static get tableName() {
        return 'teachers'
    }

    // static get relationMappings() {
	// 	return {
	// 		user: {
	// 			relation: Model.BelongsToOneRelation,
	// 			modelClass: User,
	// 			join: {
	// 				from: "token.user_id",
	// 				to: "user.id",
	// 			},
	// 		},
	// 	};
	// }
}