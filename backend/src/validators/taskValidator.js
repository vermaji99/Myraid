const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().required().min(3).max(100),
  description: Joi.string().required().min(5).max(1000),
  status: Joi.string().valid('pending', 'in-progress', 'completed'),
});

module.exports = { taskSchema };
