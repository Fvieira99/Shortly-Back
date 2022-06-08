import { Router } from "express";
import {
  addShortenLinks,
  getSingleLink,
  openShortLink,
  deleteShortLink
} from "../controllers/urls.js";
import validateShortenLink from "../middlewares/createShortenLink.js";
import validateToken from "../middlewares/token.js";

const urlsRouter = Router();

urlsRouter.post(
  "/urls/shorten",
  validateToken,
  validateShortenLink,
  addShortenLinks
);
urlsRouter.get("/urls/:id", getSingleLink);
urlsRouter.delete("/urls/:id", validateToken, deleteShortLink);
urlsRouter.get("/urls/open/:shortUrl", openShortLink);

export default urlsRouter;
