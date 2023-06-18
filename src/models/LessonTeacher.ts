import { Model } from "objection";




export default class LessonTeacher extends Model {
    lesson_id!: number
    teacher_id!: number


    static get tableName() {
        return 'lesson_teachers'
    }


}