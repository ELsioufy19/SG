import express from 'express';
import { createChapter, getAllChapters, updateChapterProgress,toggleFavoriteChapter } from './chapter.controller.js';
import { isAuthenticated } from '../../middleware/authentication.js';

const router = express.Router();


router.post('/chapters',isAuthenticated,createChapter);
router.get('/chapters',isAuthenticated, getAllChapters);
router.get('/chapters',isAuthenticated, updateChapterProgress);
router.patch('/favorite/:chapterId', isAuthenticated, toggleFavoriteChapter);

export default router;





