import { IResponseData } from "../interfaces";
import { Category } from "../models";


/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<IResponseData>}
 */
const createCategory = async (categoryBody) => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: categoryBody }
  const newCategory: any = new Category(categoryBody);
  const category = await Category.findOne({ categoryCode: categoryBody.categoryCode });
  if (category === null) {
    const categorySave = await newCategory.save();
    if (categorySave === null) {
      result.statusCode = 500
    } else {
      result.statusCode = 200
      result.data = categorySave
    }
  } else {
    result.statusCode = 200
    result.message = "Category exited"
  }
  return result;
};


/**
 * Query for category
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<IResponseData>}
 */
const queryCategories = async (filter, options): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const categories = await Category.paginate(filter, options);
  result.data = categories
  return result;
};


/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<IResponseData>}
 */
const getCategoryById = async (id): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  let category = await Category.findById(id);
  if (!category) {
    result.statusCode = 400
    result.message = "Category not found"
  } else {
    result.data = category
  }
  return result;
};


/**
 * Update category by id
 * @param {ObjectId} categoryId
 * @param {Object} updateBody
 * @returns {Promise<IResponseData>}
 */
const updateCategoryById = async (id, updateBody): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  let category = await Category.findOneAndUpdate({ _id: id }, updateBody, { returnOriginal: false })
  if (!category) {
    result.statusCode = 400
    result.message = "Category not found"
  } else {
    result.data = category
  }
  return result;
};


/**
 * Remove category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<IResponseData>}
 */
const removeCategoryById = async (id): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const category = await Category.findOne({ _id: id });
  if (!category) {
    result.statusCode = 400
    result.message = "Category not found"
  } else {
    category.deleted = 'Y'
    await category.save()
    result.message = "Category deleted Successfully"
  }
  return result;
};


/**
 * Delete category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<IResponseData>}
 */
const deleteCategoryById = async (id): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const category = await Category.findOneAndDelete({ _id: id });
  if (!category) {
    result.statusCode = 400
    result.message = "Category not found"
  } else {
    result.message = "Category deleted Successfully"
  }
  return result;
};

export const categoryService = { queryCategories, getCategoryById, updateCategoryById, createCategory, removeCategoryById, deleteCategoryById }
