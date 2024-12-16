import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { createUser } from "./user.controller.js";
import catchError from "../../utils/catchError.js";
import { updateChapterProgress } from "../chapter/chapter.controller.js";

const router = new Router();

router.post('/signup', catchError(createUser));
// router.get("user", isAuthenticated, catchError(get));
router.put('/chapters', updateChapterProgress);



export default router;
