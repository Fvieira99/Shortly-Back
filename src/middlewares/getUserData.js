import db from "../../config/db.js";

export default async function validateUser(req, res, next) {
  const { id } = req.params;
  const tokenId = req.user.id;

  if (tokenId !== parseInt(id))
    return res.status(401).send("O error foi depois do middleware");

  try {
    const user = await db.query(
      `
      SELECT * FROM users
      WHERE id = $1
    `,
      [id]
    );

    if (!user.rows[0]) return res.sendStatus(404);

    res.locals.user = {
      id: user.rows[0].id,
      name: user.rows[0].name,
      visitCount: 0
    };
    next();
  } catch (error) {}
}
