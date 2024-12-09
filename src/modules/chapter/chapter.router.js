import express from 'express';
import {createChapter,getChapters} from './chapter.controller';


const router = express.Router();

router.post('/chapters', createChapter);
router.get('/chapters', getChapters);
// router.put('/chapters', updateChapterProgress);

module.exports = router;
