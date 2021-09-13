import Joi from "joi";
import { customValidation } from "./custom.validation";


const createProduct = {
  body: Joi.object().keys({
    productCode: Joi.string().required(),
    productName: Joi.string().required(),
    productGroupId: Joi.string().required().custom(customValidation.objectId),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProductById = {
  params: Joi.object().keys({
    productId: Joi.string().custom(customValidation.objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(customValidation.objectId),
  }),
  body: Joi.object()
    .keys({
      productCode: Joi.string(),
      productName: Joi.string(),
      productGroupId: Joi.string().custom(customValidation.objectId),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(customValidation.objectId),
  }),
};

export const productValidation = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
