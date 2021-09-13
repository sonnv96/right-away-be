import Joi from "joi";
import { customValidation } from "./custom.validation";


const createMerchant = {
  body: Joi.object().keys({
    merchantCode: Joi.string().required(),
    name: Joi.string().required(),
    merchantDetailId: Joi.required().custom(customValidation.objectId),
    productGroupId: Joi.required().custom(customValidation.objectId),
    categoryId: Joi.required().custom(customValidation.objectId),
  }),
};

const getCategories = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMerchantById = {
  params: Joi.object().keys({
    merchantId: Joi.string().custom(customValidation.objectId),
  }),
};

const updateMerchant = {
  params: Joi.object().keys({
    merchantId: Joi.required().custom(customValidation.objectId),
  }),
  body: Joi.object()
    .keys({
      merchantCode: Joi.string(),
      name: Joi.string(),
      merchantDetailId: Joi.string().custom(customValidation.objectId),
      productGroupId: Joi.string().custom(customValidation.objectId),
      categoryId: Joi.string().custom(customValidation.objectId),
    })
    .min(1),
};

const deleteMerchant = {
  params: Joi.object().keys({
    merchantId: Joi.string().custom(customValidation.objectId),
  }),
};

export const merchantValidation = {
  createMerchant,
  getCategories,
  getMerchantById,
  updateMerchant,
  deleteMerchant
};
