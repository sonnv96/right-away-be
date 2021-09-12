import Joi from "joi";
import { CustomValidation } from "./custom.validation";


const getUsers = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUserById = {
  params: Joi.object().keys({
    userId: Joi.string().custom(CustomValidation.objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(CustomValidation.objectId),
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
    userId: Joi.string().custom(CustomValidation.objectId),
  }),
};

export const userValidation = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
