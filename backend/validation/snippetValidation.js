const Joi = require("joi");

const snippetValidation = {
  create: Joi.object({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().max(500).allow(''),
    code: Joi.string().min(1).required(),
    language: Joi.string().max(50).required(),
    tags: Joi.array().items(Joi.string().max(20)),
    isPublic: Joi.boolean(),
    favorite: Joi.boolean()
  }),
  
  update: Joi.object({
    title: Joi.string().min(1).max(100),
    description: Joi.string().max(500).allow(''),
    code: Joi.string().min(1),
    language: Joi.string().max(50),
    tags: Joi.array().items(Joi.string().max(20)),
    isPublic: Joi.boolean(),
    favorite: Joi.boolean()
  })
};

module.exports = snippetValidation;