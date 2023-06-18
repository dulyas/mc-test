import { Model } from "objection";



export default class LessonStudent extends Model {
    lesson_id!: number
    student_id!: number
    visited!: boolean


    static get tableName() {
        return 'lesson_students'
    }


}