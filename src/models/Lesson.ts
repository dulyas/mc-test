import { Model } from "objection";



export default class Lesson extends Model {
    id!: number
    date!: Date
    title!: string
    status!: boolean

    static get tableName() {
        return 'lessons'
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