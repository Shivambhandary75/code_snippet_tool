const Joi = require("joi");

const createSnippetSchema = Joi.object({
  title: Joi.string().max(200).optional(),
  content: Joi.string().required(),
  language: Joi.string().max(50).optional(),
  visibility: Joi.string().valid("public", "unlisted", "private").optional(),
  expiresInDays: Joi.number().integer().min(1).max(365).optional(),
});

module.exports = { createSnippetSchema };
