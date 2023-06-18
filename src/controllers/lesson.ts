import { createLessonsService } from './../services/lesson';

import { getLessonsService } from "@/services/lesson";
import { Request, Response } from "express";



export const getLessons = async (req: Request, res: Response): Promise<void> => {
    try {
        const { date = '', status = '', teacherIds = '', studentsCount = '', page = 1, lessonsPerPage = 5 } = req.query

        const lessons = await getLessonsService(String(date), String(status), String(teacherIds), String(studentsCount), +page || 1, +lessonsPerPage || 5)
    
        res.json({
            success: true,
            lessons
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message ?? error
            })
        } else {
            res.json({
                success: false,
                message: "Непредвиденная ошибка"
            })
        }
    }
}

export const createLessons = async (req: Request, res: Response): Promise<void> => {

    try {
        const {teacherIds, title, days, firstDate, lessonsCount, lastDate} = req.body

        if (!Array.isArray(teacherIds)) {
            throw new Error('teachersId должно передаваться в формате [1, 2]')
        }

        if (!Array.isArray(days)) {
            throw new Error('days должно передаваться в формате [1, 2], если нужно добавить урок только на один день, передайте номер дня в массиве с одним элементом, например [4]')
        }

        if (lessonsCount !== undefined && typeof +lessonsCount !== 'number') {
            throw new Error('lessonsCount должно быть числом или строкой которая преобразуется в число')
        }

        if (!title) {
            throw new Error('поле "title" обязательно, пример "Pink Color"')
        }
    
        const lessons = await createLessonsService(teacherIds, title, days, firstDate, +lessonsCount, lastDate)
    
        res.json({
            success: true,
            lessons
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message ?? error
            })
        } else {
            res.json({
                success: false,
                message: "Непредвиденная ошибка"
            })
        }
    }

}