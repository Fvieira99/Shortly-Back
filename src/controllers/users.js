import db from "../../config/db.js";

export async function getUserData(req, res) {
  const { id } = req.params;

  let body;

  try {
    const userData = await db.query(
      `
    SELECT users.id AS id, users.name AS name, 
    SUM(links.views) AS "visitCount"
    FROM links
    JOIN users ON users.id = links."userId"
    WHERE users.id = $1
    GROUP BY users.id
    
    `,
      [id]
    );

    const userLinks = await db.query(
      `
      SELECT id, "shortLink" AS "shortUrl", "originalLink" AS url, views AS "visitCount" 
      FROM links
      WHERE "userId" = $1
    
    `,
      [id]
    );

    if (!userData.rows[0]) {
      body = { ...res.locals.user, shortenedUrls: userLinks.rows };
      console.log(body);
    } else {
      body = { ...userData.rows[0], shortenedUrls: userLinks.rows };
    }

    res.status(200).send(body);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getRanking(req, res) {
  try {
    const ranking = await db.query(`
    SELECT users.id AS id, users.name AS name,
    COUNT(links.id) AS "linksCount",
    SUM(links.views) AS "visitCount"
    FROM users
    JOIN links ON users.id = links."userId"
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10

    `);

    res.send(ranking.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
