import Joi from "joi";

const shortenLinkValidation = Joi.object({
  url: Joi.string()
    .uri()
    .pattern(/^https?:\/\/[w]{3}.(.*).(.*)$/)
    .required()
});

export default shortenLinkValidation;
