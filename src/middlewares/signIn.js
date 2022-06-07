import signInValidation from "../schemas/signIn.js";

export default function validateSignIn(req, res, next) {
  const validation = signInValidation.validate(req.body, { abortEarly: false });

  if (validation.error) {
    return res
      .status(422)
      .send(validation.error.details.map(detail => detail.message));
  }

  next();
}
