import { Router } from "express";

import authRouter from "./auth.js";
import urlsRouter from "./ulrs.js";

const router = Router();

router.use(authRouter);
router.use(urlsRouter);

export default router;
