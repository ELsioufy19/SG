import express from 'express';
import {createChapter,getChapters,updateChapterProgress} from './chapter.controller.js';


const router = express.Router();

router.post('/chapters', createChapter);
router.get('/chapters', getChapters);
router.get('/chapters', updateChapterProgress);

export default router;
