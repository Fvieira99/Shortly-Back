import { Router } from "express";
import { addShortenLinks } from "../controllers/urls.js";
import validateShortenLink from "../middlewares/shortenLink.js";
import validateToken from "../middlewares/token.js";

const urlsRouter = Router();

urlsRouter.post(
  "/urls/shorten",
  validateToken,
  validateShortenLink,
  addShortenLinks
);

export default urlsRouter;
