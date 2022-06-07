import { Router } from "express";
import {
  addShortenLinks,
  getSingleLink,
  openShortLink
} from "../controllers/urls.js";
import validateShortenLink from "../middlewares/shortenLink.js";
import validateToken from "../middlewares/token.js";

const urlsRouter = Router();

urlsRouter.post(
  "/urls/shorten",
  validateToken,
  validateShortenLink,
  addShortenLinks
);
urlsRouter.get("/urls/:id", getSingleLink);
urlsRouter.get("/urls/open/:shortUrl", openShortLink);

export default urlsRouter;
