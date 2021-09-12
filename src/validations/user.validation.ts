import Joi from "joi";
import { customValidation } from "./custom.validation";


const getUsers = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUserById = {
  params: Joi.object().keys({
    userId: Joi.string().custom(customValidation.objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(customValidation.objectId),
  }),
  body: Joi.object()
    .keys({
      username: Joi.string(),
      email: Joi.string(),
      displayName: Joi.string(),
      photoUrl: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(customValidation.objectId),
  }),
};

export const userValidation = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
