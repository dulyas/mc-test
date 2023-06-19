
import { Lesson } from "../src/models"
import request from 'supertest'
import app from "../src/index"

import {expect} from '@jest/globals';
import type {MatcherFunction} from 'expect';




test('GetLessons', async () => {
    const _request = await request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(({ body }) => {
            expect(body.success).toBe(true)
            expect(body.lessons).toBeInstanceOf(Array)
            
            for (const lesson of body.lessons) {

                expect(lesson).toEqual(expect.objectContaining({
                    id: expect.any(Number),
                    date: expect.any(String),
                    title: expect.any(String),
                    status: expect.any(Number),
                    teachers: expect.any(Array),
                    students: expect.any(Array)
                  }))

            }
            
        });

})  

test('Get lesson id 4', async () => {
    const lesson4 = {
        "success": true,
        "lessons": [
            {
                "id": 4,
                "date": "2019-09-04",
                "title": "Blue Color",
                "status": 1,
                "visitCount": "4",
                "teachers": [
                    {
                        "id": 4,
                        "name": "Masha"
                    }
                ],
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    },
                    {
                        "id": 4,
                        "name": "Slava",
                        "visit": true
                    }
                ]
            }
        ]
    }

    const _request = await request(app)
    .get('?status=1&page=1&lessonsPerPage=5&teacherIds=4,1&studentsCount=4&date=2019-09-02,2019-09-05')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(({ body }) => {
        expect(body.success).toBe(true)
        expect(body.lessons).toBeInstanceOf(Array)
        
        expect(body).toEqual(lesson4)
        
    });

        // здесь конечно нужно было полностью расписать что прийти должно 
})

test('Get lesson id 4', async () => {
    const lesson4 = {
        "success": true,
        "lessons": [
            {
                "id": 4,
                "date": "2019-09-04",
                "title": "Blue Color",
                "status": 1,
                "visitCount": "4",
                "teachers": [
                    {
                        "id": 4,
                        "name": "Masha"
                    }
                ],
                "students": [
                    {
                        "id": 1,
                        "name": "Ivan",
                        "visit": true
                    },
                    {
                        "id": 2,
                        "name": "Sergey",
                        "visit": true
                    },
                    {
                        "id": 3,
                        "name": "Maxim",
                        "visit": true
                    },
                    {
                        "id": 4,
                        "name": "Slava",
                        "visit": true
                    }
                ]
            }
        ]
    }

    const _request = await request(app)
    .get('?status=1&page=1&lessonsPerPage=5&teacherIds=4,1&studentsCount=4&date=2019-09-02,2019-09-05')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(({ body }) => {
        expect(body.success).toBe(true)
        expect(body.lessons).toBeInstanceOf(Array)
        
        expect(body).toEqual(lesson4)
        
    });

        // здесь конечно нужно было полностью расписать что прийти должно 
})