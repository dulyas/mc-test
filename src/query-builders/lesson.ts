
import { QueryBuilder } from "objection"
import { Lesson } from "@/models"



export const statusBuilder = (builder: QueryBuilder<Lesson, Lesson[]>, status: string) => {
    if (status !== '' && (+status === 1 || +status === 0)) {
        return builder.where({status: +status})
    } else {
        return builder
    }
}

export const teacherBuilder = (builder: QueryBuilder<Lesson, Lesson[]>, teacherIds: string) => {
    if (teacherIds === '') {
        return builder
    } else if (teacherIds.includes(',')) {
        const arrayOfTeacherIds = teacherIds.trim().split(',')
        return builder.joinRelated('teachers').whereIn('id', arrayOfTeacherIds)
    } else {
        return builder.joinRelated('teachers').where('id', +teacherIds)
    }
}

export const studentBuilder = (builder: QueryBuilder<Lesson, Lesson[]>, studentsCount: string) => {

    if (studentsCount === '') {
        return builder
    } else if (studentsCount.includes(',')) {
        const studentsCountArray = studentsCount.trim().split(',').map(count => +count)
        const min = Math.min(...studentsCountArray)
        const max = Math.max(...studentsCountArray)
        return builder.whereBetween('studentsCount', [min, max])
    } else {
        return builder.where('studentsCount', studentsCount)
    }
}

export const dateBuilder = (builder: QueryBuilder<Lesson, Lesson[]>, date: string) => {
    if (date === '') {
        return builder
    } else if (date.includes(',')) {
        const arrayOfDates = date.trim().split(',').map(dateEl => new Date(dateEl).getTime())

        const min = new Date(Math.min(...arrayOfDates))
        const max = new Date(Math.max(...arrayOfDates))

        if (min.toString() === 'Invalid Date' || max.toString() === 'Invalid Date') {
            return builder
        }

        return builder.whereBetween('date', [min, max])

    } else {
        const dateObject = new Date(date)


        return builder.where('date', dateObject)
    }
}


export const studentsCountQuery = Lesson.query()
.select(
'lessons.*',
Lesson.relatedQuery('students').where('visit', true).count().as('visitCount'),
Lesson.relatedQuery('students').count().as('studentsCount')
).as('countQuery');

