import Joi from "joi";
import { customValidation } from "./custom.validation";


const createMerchantDetail = {
  body: Joi.object().keys({
    merchantDetailCode: Joi.string().required(),
    address: {
      street: Joi.string(),
      ward: Joi.string(),
      district: Joi.string(),
      city: Joi.string().required(),
    },
    time: {
      timeOpen: Joi.string(),
      timeClosed: Joi.string(),
    },
    prices: {
      priceFrom: Joi.string(),
      maxPrice: Joi.string(),
    },
    voteQuantity: Joi.number().required(),
    merchantId: Joi.string().required().custom(customValidation.objectId),
  }),
};

const getMerchantDetails = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMerchantDetailById = {
  params: Joi.object().keys({
    merchantDetailId: Joi.string().custom(customValidation.objectId),
  }),
};

const updateMerchantDetail = {
  params: Joi.object().keys({
    merchantDetailId: Joi.required().custom(customValidation.objectId),
  }),
  body: Joi.object()
    .keys({
      merchantDetailCode: Joi.string(),
      address: {
        street: Joi.string(),
        ward: Joi.string(),
        district: Joi.string(),
        city: Joi.string(),
      },
      time: {
        timeOpen: Joi.string(),
        timeClosed: Joi.string(),
      },
      prices: {
        priceFrom: Joi.string(),
        maxPrice: Joi.string(),
      },
      voteQuantity: Joi.number(),
      merchantId: Joi.string().custom(customValidation.objectId),
    })
    .min(1),
};

const deleteMerchantDetail = {
  params: Joi.object().keys({
    merchantDetailId: Joi.string().custom(customValidation.objectId),
  }),
};

export const merchantDetailValidation = {
  createMerchantDetail,
  getMerchantDetails,
  getMerchantDetailById,
  updateMerchantDetail,
  deleteMerchantDetail
};
