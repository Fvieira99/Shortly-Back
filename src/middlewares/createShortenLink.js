import db from "../../config/db.js";
import shortenLinkValidation from "../schemas/shortenLink.js";
import urlExist from "url-exist";

export default async function validateShortenLink(req, res, next) {
  const { url } = req.body;
  const { id } = req.user;

  const schemaValidation = shortenLinkValidation.validate(req.body, {
    abortEarly: false
  });

  if (schemaValidation.error) {
    return res
      .status(422)
      .send(schemaValidation.error.details.map(detail => detail.message));
  }

  try {
    const exists = await urlExist(url);

    if (!exists) return res.status(404).send("Site não encontrado");

    const alreadyExistslink = await db.query(
      `
      SELECT * FROM links
      WHERE "originalLink" = $1 AND "userId" = $2
    
    `,
      [url, id]
    );

    if (alreadyExistslink.rows[0]) {
      return res
        .status(409)
        .send(
          `Já existe um link encurtado para essa URL, acesse por: ${alreadyExistslink.rows[0].shortLink}`
        );
    }

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
