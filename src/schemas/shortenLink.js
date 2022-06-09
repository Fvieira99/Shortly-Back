import Joi from "joi";

const shortenLinkValidation = Joi.object({
  url: Joi.string()
    .uri()
    .pattern(/^https?:\/\/(.*)$/)
    .required()
});

export default shortenLinkValidation;
