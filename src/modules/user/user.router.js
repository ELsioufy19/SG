import { Router } from "express";
// import { isAuthenticated } from "../../middleware/authentication.js";
import { createUser } from "./user.controller.js";
import catchError from "../../utils/catchError.js";
import { updateChapterProgress } from "../chapter/chapter.controller.js";
import { getUserById } from "./user.controller.js";
import { login,forgetPass,resetPass } from './user.controller.js';

const router = new Router();





router.get("/confirm/:token", async (req, res) => {
    const { token } = req.params;
  
    // Find user by token
    const user = await User.findOne({
      confirmationToken: token,
      confirmationExpires: { $gt: Date.now() }, // Check if token is still valid
    });
  
    if (!user) {
      return res.status(400).send("Invalid or expired token.");
    }
    user.isVerified = true;
    user.confirmationToken = undefined; // Remove token
    user.confirmationExpires = undefined;
    await user.save();
  
    res.status(200).send("Email confirmed successfully!");
  });

router.post('/signup', catchError(createUser));
router.put('/chapters', updateChapterProgress);
router.get('/user/:id', catchError(getUserById));
router.post('/login', login);
router.post('/forget-password', forgetPass);
router.post('/reset-password/:code', resetPass);



export default router;

