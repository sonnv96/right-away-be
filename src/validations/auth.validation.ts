import Joi from "joi";
import { customValidation } from "./custom.validation";

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(customValidation.password),
    username: Joi.string().required(),
    displayName: Joi.string(),
    photoUrl: Joi.string(),
  }),
};

const login = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};


const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const getUserByToken = {
  body: Joi.object().keys({
    access_token: Joi.string().required(),
  }),
};

// const forgotPassword = {
//   body: Joi.object().keys({
//     email: Joi.string().email().required(),
//   }),
// };

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(customValidation.password),
  }),
};
const changePassword = {

  body: Joi.object().keys({
    oldPassword: Joi.string().required().custom(customValidation.password),
    newPassword: Joi.string().required().custom(customValidation.password),
    username: Joi.string().required(),
  }),
};



export const authValidation = {
  register,
  login,
  changePassword,
  getUserByToken,
  refreshTokens,
  resetPassword,
};
