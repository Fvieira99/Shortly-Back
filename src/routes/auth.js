import { Router } from "express";

import { signIn, signUp } from "../controllers/auth.js";
import validateSignIn from "../middlewares/signIn.js";
import validateSignUp from "../middlewares/signUp.js";

const authRouter = Router();

authRouter.post("/signup", validateSignUp, signUp);
authRouter.post("/signin", validateSignIn, signIn);

export default authRouter;
