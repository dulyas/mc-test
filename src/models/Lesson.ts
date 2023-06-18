import { Model } from "objection";
import Teacher from "./Teacher";
import Student from "./Student";



export default class Lesson extends Model {
    id!: number
    date!: Date
    title!: string
    status!: 1 | 0


    static get tableName() {
        return 'lessons'
    }

    static get relationMappings() {
		return {
			teachers: {
				relation: Model.ManyToManyRelation,
				modelClass: Teacher,
				join: {
					from: 'lessons.id',
					through: {
					  from: 'lesson_teachers.lesson_id',
					  to: 'lesson_teachers.teacher_id'
					},
					to: 'teachers.id'
				  }
			},
			students: {
				relation: Model.ManyToManyRelation,
				modelClass: Student,
				join: {
					from: 'lessons.id',
					through: {
					  from: 'lesson_students.lesson_id',
					  extra: ['visit'],
					  to: 'lesson_students.student_id'
					},
					to: 'students.id'
				  }
			}
		};
	}


}