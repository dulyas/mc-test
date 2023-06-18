
import { Lesson, LessonTeacher } from "@/models"
import { statusBuilder, teacherBuilder, studentBuilder, dateBuilder, studentsCountQuery } from "@/query-builders/lesson"
import moment from 'moment'


export const getLessonsService = async (date: string, status: string, teacherIds: string, studentsCount: string, page: number, lessonsPerPage: number): Promise<Lesson[]> => {


    const lessons = await Lesson.query()
        .from(studentsCountQuery) // считаем количество записанных и посетивших учеников
        .where(builder => statusBuilder(builder, status)) // фильтруем
        .andWhere(builder => teacherBuilder(builder, teacherIds))
        .andWhere(builder => studentBuilder(builder, studentsCount))
        .andWhere(builder => dateBuilder(builder, date))
        .withGraphFetched('[teachers, students]') // подгружаем учителей и учеников
        .select(['id', 'date', 'title', 'status', 'visitCount']) // убираем каунтер записанных учеников
        .limit(lessonsPerPage) // задаем лимит на страницу
        .offset((page - 1) * lessonsPerPage) // задаем страницу

    return lessons
}


export const createLessonsService = async (teacherIds: number[], title: string, days: number[], firstDate: string, lessonsCount: number | undefined, lastDate: string | undefined): Promise<number[]> => {
    
    try {
        const lessonsForInsert: Pick<Lesson, 'date' | 'title' | 'status'>[] = []
        
        // форматируем даты

        const firstDateFormat = moment(new Date(firstDate)) 
        const lastDateFormat = lastDate && moment(new Date(lastDate)) || null


        if (firstDateFormat.toString() === 'Invalid date' || (lastDateFormat && lastDateFormat.toString() === 'Invalid date')) {
            throw new Error('Дата задана не в правильном формате, правильный формат: "2023-07-23"')
        }

        let currentDate =  moment(new Date(firstDate))


        let addedCount = 0
        let currentCount = 0

        

        if (lastDate || lessonsCount) { // если задали каунт или последнюю дату значит урок очевидно не один
            while (
                (
                    (lessonsCount && lessonsCount > addedCount)  // если есть каунт
                        || 
                    (lastDateFormat && lastDateFormat.diff(currentDate, 'days') > 0)  // если есть дата
                )
                && currentDate.diff(firstDateFormat, 'years') <= 0 // не даем дальше чем на год вперед залезать
                && currentCount < 300 // и не более 300 записей
                ) {
        
                const dayOfWeek = currentDate.day() // узнаем индекс дня недели
        
        
        
                if (days.includes(dayOfWeek)) { // записываем если день недели подходит 
                    lessonsForInsert.push({
                        date: currentDate.toDate(),
                        title: title,
                        status: 0
                    })
                    addedCount++ // инкремент каунта добавления
                }
        
                currentDate.add(1, 'days') // инкремент дня
                currentCount++ // инкремент каунта итерации
            }
        } else { // если не задали значит добавляем один урок
            lessonsForInsert.push({
                date: currentDate.toDate(),
                title: title,
                status: 0
            })
        }

        const lessons = await Lesson // инсертим уроки
            .query()
            .insert(lessonsForInsert)


        const lessonsIds = lessons.map(lesson => lesson.id) // создаем массив айдишников

        for (const teacherId of teacherIds) { // итерируем по учителям

            const lessonTeachersForInsert = lessonsIds.map(lessonId => ({ // создаем объекты для пуша в таблицу учителя-уроки
                lesson_id: +lessonId,
                teacher_id: +teacherId
            })) 

            await LessonTeacher // инсертим учителя уроки
                .query()
                .insert(lessonTeachersForInsert)
                .returning('lesson_id')
        }

        return lessonsIds
    } catch (error) {
        console.log(error)
        return []
    }

}