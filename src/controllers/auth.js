import db from "../../config/db.js";
import bcrypt from "bcrypt";
import { stripHtml } from "string-strip-html";

export async function signup(req, res) {
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
