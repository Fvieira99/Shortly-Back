import { Router } from "express";

import { signup } from "../controllers/auth.js";
import validateSignUp from "../middlewares/signUp.js";

const authRouter = Router();

authRouter.post("/signup", validateSignUp, signup);
authRouter.post("/signin");

export default authRouter;
