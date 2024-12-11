import Joi from 'joi'

export const addRule = Joi.object({
  Firstname: Joi.string().required().min(3),
  Lastname: Joi.string().required().min(3),
  Username: Joi.string().required(),
  Password: Joi.string().required()
})
