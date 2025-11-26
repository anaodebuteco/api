const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(120).required(),
  description: Joi.string().max(500).allow('', null),
  status: Joi.string().valid('pending', 'in_progress', 'done').optional(),
  dueDate: Joi.date().optional(),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(120).optional(),
  description: Joi.string().max(500).allow('', null),
  status: Joi.string().valid('pending', 'in_progress', 'done').optional(),
  dueDate: Joi.date().optional(),
}).min(1);

module.exports = { createTaskSchema, updateTaskSchema };
