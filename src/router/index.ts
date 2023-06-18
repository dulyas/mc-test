

import { getLessons, createLessons } from "@/controllers/lesson";
import { Router } from "express";

const router = Router()

router.get('/', getLessons)
router.post('/lessons', createLessons)

export default router