import express from 'express';
import {createChapter,getChapters} from './chapter.controller.js';


const router = express.Router();

router.post('/chapters', createChapter);
router.get('/chapters', getChapters);
// router.put('/chapters', updateChapterProgress);

export default router;
