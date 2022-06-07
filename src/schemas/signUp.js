import Joi from "joi";

const signUpValidation = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(1).required(),
  passwordConfirmation: Joi.ref("password")
});

export default signUpValidation;
