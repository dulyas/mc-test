import { createLessonsService } from './../services/lesson';

import { getLessonsService } from "@/services/lesson";
import { Request, Response } from "express";



export const getLessons = async (req: Request, res: Response): Promise<void> => {
    const { date = '', status = '', teacherIds = '', studentsCount = '', page = 1, lessonsPerPage = 5 } = req.query



    const lessons = await getLessonsService(String(date), String(status), String(teacherIds), String(studentsCount), +page || 1, +lessonsPerPage || 5)

    res.json({
        lessons
    })
}

export const createLessons = async (req: Request, res: Response): Promise<void> => {

    const {teacherIds, title, days, firstDate, lessonsCount, lastDate} = req.body

    const lessons = await createLessonsService(teacherIds, title, days, firstDate, lessonsCount, lastDate)

    res.json({
        lessons
    })

}