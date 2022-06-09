import { Router } from "express";
import { getRanking, getUserData } from "../controllers/users.js";
import validateUser from "../middlewares/getUserData.js";
import validateToken from "../middlewares/token.js";

const userRouter = Router();

userRouter.get("/users/:id", validateToken, validateUser, getUserData);
userRouter.get("/ranking", getRanking);

export default userRouter;
