import { IResponseData } from "../interfaces";
import { ProductGroup } from "../models";


/**
 * Create a productGroup
 * @param {Object} productGroupBody
 * @returns {Promise<IResponseData>}
 */
const createProductGroup = async (productGroupBody) => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: productGroupBody }
  const newProductGroup: any = new ProductGroup(productGroupBody);
  const productGroup = await ProductGroup.findOne({ productGroupCode: productGroupBody.productGroupCode });
  if (productGroup === null) {
    const productGroupSave = await newProductGroup.save();
    if (productGroupSave === null) {
      result.statusCode = 500
    } else {
      result.statusCode = 200
      result.data = productGroupSave
    }
  } else {
    result.statusCode = 200
    result.message = "ProductGroup exited"
  }
  return result;
};


/**
 * Query for productGroup
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<IResponseData>}
 */
const queryProductGroups = async (filter, options): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const categories = await ProductGroup.paginate(filter, options);
  result.data = categories
  return result;
};


/**
 * Get productGroup by id
 * @param {ObjectId} id
 * @returns {Promise<IResponseData>}
 */
const getProductGroupById = async (id): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  let productGroup = await ProductGroup.findById(id);
  if (!productGroup) {
    result.statusCode = 400
    result.message = "ProductGroup not found"
  } else {
    result.data = productGroup
  }
  return result;
};


/**
 * Update productGroup by id
 * @param {ObjectId} productGroupId
 * @param {Object} updateBody
 * @returns {Promise<IResponseData>}
 */
const updateProductGroupById = async (id, updateBody): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  let productGroup = await ProductGroup.findOneAndUpdate({ _id: id }, updateBody, { returnOriginal: false })
  if (!productGroup) {
    result.statusCode = 400
    result.message = "ProductGroup not found"
  } else {
    result.data = productGroup
  }
  return result;
};


/**
 * Remove productGroup by id
 * @param {ObjectId} productGroupId
 * @returns {Promise<IResponseData>}
 */
const removeProductGroupById = async (id): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const productGroup = await ProductGroup.findOne({ _id: id });
  if (!productGroup) {
    result.statusCode = 400
    result.message = "ProductGroup not found"
  } else {
    productGroup.deleted = 'Y'
    await productGroup.save()
    result.message = "ProductGroup deleted Successfully"
  }
  return result;
};


/**
 * Delete productGroup by id
 * @param {ObjectId} productGroupId
 * @returns {Promise<IResponseData>}
 */
const deleteProductGroupById = async (id): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const productGroup = await ProductGroup.findOneAndDelete({ _id: id });
  if (!productGroup) {
    result.statusCode = 400
    result.message = "ProductGroup not found"
  } else {
    result.message = "ProductGroup deleted Successfully"
  }
  return result;
};

export const productGroupService = { queryProductGroups, getProductGroupById, updateProductGroupById, createProductGroup, removeProductGroupById, deleteProductGroupById }
