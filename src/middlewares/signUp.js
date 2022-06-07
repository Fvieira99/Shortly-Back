import signUpValidation from "../schemas/signUp.js";
import db from "../../config/db.js";

export default async function validateSignUp(req, res, next) {
  const { email } = req.body;
  const validation = signUpValidation.validate(req.body, { abortEarly: false });

  if (validation.error) {
    return res
      .status(422)
      .send(validation.error.details.map(detail => detail.message));
  }

  try {
    const user = await db.query(
      `
      SELECT id FROM users
      WHERE email = $1
    `,
      [email]
    );
    if (user.rows[0]) {
      return res.sendStatus(409);
    }

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
