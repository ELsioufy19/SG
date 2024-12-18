import { Router } from "express";
// import { isAuthenticated } from "../../middleware/authentication.js";
import { createUser } from "./user.controller.js";
import catchError from "../../utils/catchError.js";
import { updateChapterProgress } from "../chapter/chapter.controller.js";
import { getUserById } from "./user.controller.js";

const router = new Router();

router.post('/signup', catchError(createUser));
// router.get("user", isAuthenticated, catchError(get));
router.put('/chapters', updateChapterProgress);
router.get('/user/:id', catchError(getUserById));
router.post('/login', login);



export default router;

