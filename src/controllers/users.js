import db from "../../config/db.js";

export async function getUserData(req, res) {
  const { id } = req.params;
  const tokenId = req.user.id;

  if (tokenId !== parseInt(id))
    return res.status(401).send("O error foi depois do middleware");

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

    if (!userData.rows[0]) return res.sendStatus(404);

    const userLinks = await db.query(
      `
      SELECT id, "shortLink" AS "shortUrl", "originalLink" AS url, views AS "visitCount" 
      FROM links
      WHERE "userId" = $1
    
    `,
      [id]
    );
    const body = { ...userData.rows[0], shortenedUrls: userLinks.rows };

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
