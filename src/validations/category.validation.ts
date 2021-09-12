import Joi from "joi";
import { CustomValidation } from "./custom.validation";


const createCategory = {
  body: Joi.object().keys({
    categoryCode: Joi.string().required(),
    categoryName: Joi.string().required(),
  }),
};

const getCategories = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCategoryById = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(CustomValidation.objectId),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.required().custom(CustomValidation.objectId),
  }),
  body: Joi.object()
    .keys({
      categoryCode: Joi.string(),
      categoryName: Joi.string(),
    })
    .min(1),
};

const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(CustomValidation.objectId),
  }),
};

export const categoryValidation = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};
