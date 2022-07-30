const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const signUpBodyValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .messages({ "string.pattern.base": `Phone number must have 10 digits.` }),
  });
  return schema.validate(body);
};

const logInBodyValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(body);
};

const refreshTokenBodyValidation = (body) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required().label("Refresh Token"),
  });
  return schema.validate(body);
};


const createTradeBodyValidation = (body) => {
    const schema = Joi.object({
      type: Joi.string().required().valid('buy', 'sell').label("Type"),
      symbol: Joi.string().required().label("Symbol"),
      shares: Joi.number().required().min(1).max(100).label("Shares"),
      price: Joi.number().required().label("Price"),
    });
    return schema.validate(body);
  };

module.exports = {
  signUpBodyValidation,
  logInBodyValidation,
  refreshTokenBodyValidation,
  createTradeBodyValidation
};
