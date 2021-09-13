import Joi from "joi";
import { customValidation } from "./custom.validation";


const createProductDetail = {
  body: Joi.object().keys({
    productName: Joi.string().required(),
    productImage: Joi.string(),
    description: Joi.string(),
    price: Joi.string().required(),
    orderQuantity: Joi.number(),
    likeQuantity: Joi.number(),
    quantity: Joi.number(),
    productId: Joi.required().custom(customValidation.objectId),
  }),
};

const getProductDetails = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProductDetailById = {
  params: Joi.object().keys({
    productDetailId: Joi.string().custom(customValidation.objectId),
  }),
};

const updateProductDetail = {
  params: Joi.object().keys({
    productDetailId: Joi.required().custom(customValidation.objectId),
  }),
  body: Joi.object()
    .keys({
      productName: Joi.string(),
      productImage: Joi.string(),
      description: Joi.string(),
      price: Joi.string(),
      orderQuantity: Joi.number(),
      likeQuantity: Joi.number(),
      quantity: Joi.number(),
      productId: Joi.string().custom(customValidation.objectId),
    })
    .min(1),
};

const deleteProductDetail = {
  params: Joi.object().keys({
    productDetailId: Joi.string().custom(customValidation.objectId),
  }),
};

export const productDetailValidation = {
  createProductDetail,
  getProductDetails,
  getProductDetailById,
  updateProductDetail,
  deleteProductDetail
};
