import dotenv from "dotenv";
import { nanoid } from "nanoid";
import { stripHtml } from "string-strip-html";

import db from "../../config/db.js";

dotenv.config();

export async function addShortenLinks(req, res) {
  const { url } = req.body;
  const { id } = req.user;
  const shortLink = nanoid(8);
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

export async function getSingleLink(req, res) {
  const { id } = req.params;

  try {
    const link = await db.query(
      `
      SELECT id, "shortLink" AS "shortUrl", "originalLink" AS url 
      FROM links
      WHERE id = $1
    
    `,
      [id]
    );

    if (!link.rows[0]) return res.sendStatus(404);

    res.status(200).send(link.rows[0]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function openShortLink(req, res) {
  const { shortUrl } = req.params;
  console.log(shortUrl);

  try {
    const link = await db.query(
      `
      SELECT * FROM links 
      WHERE "shortLink" = $1 
    `,
      [shortUrl]
    );

    if (!link.rows[0]) return res.sendStatus(404);

    const updatedViews = link.rows[0].views + 1;
    const linkId = link.rows[0].id;

    console.log(link.rows[0]);
    await db.query(
      `
      UPDATE links SET views = $1
      WHERE id = $2 
    `,
      [updatedViews, linkId]
    );

    res.redirect(link.rows[0].originalLink);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deleteShortLink(req, res) {
  const shortLinkId = req.params.id;

  try {
    const link = await db.query(
      `
      SELECT * FROM links
      WHERE id = $1
    `,
      [shortLinkId]
    );
    console.log(link.rows);

    if (!link.rows[0]) return res.sendStatus(404);
    else if (link.rows[0].userId !== req.user.id)
      return res.status(401).send("Usuário diferente do dono do shortLink");

    await db.query(
      `
      DELETE FROM links 
      WHERE id = $1 AND "userId" = $2
    
    `,
      [shortLinkId, req.user.id]
    );

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
