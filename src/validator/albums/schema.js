const Joi = require('joi');

const currentDate = new Date().getFullYear();

const AlbumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(currentDate)
    .required(),
});

module.exports = {
  AlbumPayloadSchema,
};
