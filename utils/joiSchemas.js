const Joi = require('joi');
const ExpressError = require('./ExpressError');

module.exports.validateSkatepark = (req, res ,next) => {
    const skateParkSchema = Joi.object({
        name: Joi.string() .required(),
        location: Joi.string() .required(),
        price: Joi.number() .required() .min(0),
        imgUrl: Joi.string() .required()
    })
    const validation = skateParkSchema.validate(req.body);
    if (validation.error) {
        const msg = validation.error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    next()
};