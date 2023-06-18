import { Model } from "objection";



export default class Student extends Model {
    id!: number
    name!: string

    static get tableName() {
        return 'students'
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