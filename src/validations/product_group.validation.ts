import Joi from "joi";
import { customValidation } from "./custom.validation";


const createProductGroup = {
  body: Joi.object().keys({
    merchantId: Joi.string().required(),
    productGroupCode: Joi.string().required(),
    name: Joi.string().required(),
  }),
};

const getProductGroups = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProductGroupById = {
  params: Joi.object().keys({
    productGroupId: Joi.string().custom(customValidation.objectId),
  }),
};

const updateProductGroup = {
  params: Joi.object().keys({
    productGroupId: Joi.required().custom(customValidation.objectId),
  }),
  body: Joi.object()
    .keys({
      merchantId: Joi.string(),
      productGroupCode: Joi.string(),
      name: Joi.string(),
    })
    .min(1),
};

const deleteProductGroup = {
  params: Joi.object().keys({
    productGroupId: Joi.string().custom(customValidation.objectId),
  }),
};

export const productGroupValidation = {
  createProductGroup,
  getProductGroups,
  getProductGroupById,
  updateProductGroup,
  deleteProductGroup
};
