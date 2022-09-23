const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

const ExpressError = require("./ExpressError");

module.exports.validateSkatepark = (req, res, next) => {
  const skateParkSchema = Joi.object({
    name: Joi.string().required().escapeHTML(),
    location: Joi.string().required().escapeHTML(),
    price: Joi.number().required().min(0),
    //images: Joi.string().required(),
    deleteImages: Joi.array()
  })


  const validation = skateParkSchema.validate(req.body);
  if (validation.error) {
    const msg = validation.error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const reviewSchema = Joi.object({
    rating: Joi.number().required().min(1).max(5),
    review: Joi.string().required().escapeHTML(),
  });
  const validation = reviewSchema.validate(req.body);
  if (validation.error) {
    const msg = validation.error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  }
  next();
};
