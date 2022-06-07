import db from "../../config/db.js";
import bcrypt from "bcrypt";
import { stripHtml } from "string-strip-html";
import jwt from "jsonwebtoken";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);
  const stripedName = stripHtml(name).result.trim();
  const stripedEmail = stripHtml(email).result.trim();
  try {
    await db.query(
      `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
    
    `,
      [stripedName, stripedEmail, hashedPassword]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStaus(500);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.query(
      `
      SELECT * FROM users
      WHERE email = $1
    `,
      [email]
    );

    if (user.rows[0] && bcrypt.compareSync(password, user.rows[0].password)) {
      const { name, email, id } = user.rows[0];
      const token = jwt.sign(
        { id: id, email: email },
        process.env.JWT_SECRET_KEY
      );

      return res.status(200).send({ name, token });
    }

    res.sendStatus(401);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
