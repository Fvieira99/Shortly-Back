import dotenv from "dotenv";
import { nanoid } from "nanoid";
import { stripHtml } from "string-strip-html";

import db from "../../config/db.js";

dotenv.config();

export async function addShortenLinks(req, res) {
  const { url } = req.body;
  const { id } = req.user;
  const shortLink = nanoid(6);
  const originalLink = stripHtml(url).result.trim();

  try {
    await db.query(
      `
      INSERT INTO links ("userId", "originalLink", "shortLink")
      VALUES ($1, $2, $3)
  
    `,
      [id, originalLink, shortLink]
    );

    res.status(201).send({ shortUrl: shortLink });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
