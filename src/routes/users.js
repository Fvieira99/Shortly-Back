import { Router } from "express";
import { getRanking, getUserData } from "../controllers/users.js";
import validateToken from "../middlewares/token.js";

const userRouter = Router();

userRouter.get("/users/:id", validateToken, getUserData);
userRouter.get("/ranking", getRanking);

export default userRouter;
