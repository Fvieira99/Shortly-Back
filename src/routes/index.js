import { Router } from "express";

import authRouter from "./auth.js";
import urlsRouter from "./urls.js";
import userRouter from "./users.js";

const router = Router();

router.use(authRouter);
router.use(urlsRouter);
router.use(userRouter);

export default router;
