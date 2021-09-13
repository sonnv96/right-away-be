import { IResponseData } from "../interfaces";
import { ProductDetail } from "../models";


/**
 * Create a productDetail
 * @param {Object} productDetailBody
 * @returns {Promise<IResponseData>}
 */
const createProductDetail = async (productDetailBody) => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: productDetailBody }
  const newProductDetail: any = new ProductDetail(productDetailBody);
  const productDetailSave = await newProductDetail.save();
  if (productDetailSave === null) {
    result.statusCode = 500
  } else {
    result.statusCode = 200
    result.data = productDetailSave
  }
  return result;
};


/**
 * Query for productDetail
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<IResponseData>}
 */
const queryProductDetails = async (filter, options): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const categories = await ProductDetail.paginate(filter, options);
  result.data = categories
  return result;
};


/**
 * Get productDetail by id
 * @param {ObjectId} id
 * @returns {Promise<IResponseData>}
 */
const getProductDetailById = async (id): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  let productDetail = await ProductDetail.findById(id);
  if (!productDetail) {
    result.statusCode = 400
    result.message = "ProductDetail not found"
  } else {
    result.data = productDetail
  }
  return result;
};


/**
 * Update productDetail by id
 * @param {ObjectId} productDetailId
 * @param {Object} updateBody
 * @returns {Promise<IResponseData>}
 */
const updateProductDetailById = async (id, updateBody): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  let productDetail = await ProductDetail.findOneAndUpdate({ _id: id }, updateBody, { returnOriginal: false })
  if (!productDetail) {
    result.statusCode = 400
    result.message = "ProductDetail not found"
  } else {
    result.data = productDetail
  }
  return result;
};


/**
 * Remove productDetail by id
 * @param {ObjectId} productDetailId
 * @returns {Promise<IResponseData>}
 */
const removeProductDetailById = async (id): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const productDetail = await ProductDetail.findOne({ _id: id });
  if (!productDetail) {
    result.statusCode = 400
    result.message = "ProductDetail not found"
  } else {
    productDetail.deleted = 'Y'
    await productDetail.save()
    result.message = "ProductDetail deleted Successfully"
  }
  return result;
};


/**
 * Delete productDetail by id
 * @param {ObjectId} productDetailId
 * @returns {Promise<IResponseData>}
 */
const deleteProductDetailById = async (id): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const productDetail = await ProductDetail.findOneAndDelete({ _id: id });
  if (!productDetail) {
    result.statusCode = 400
    result.message = "ProductDetail not found"
  } else {
    result.message = "ProductDetail deleted Successfully"
  }
  return result;
};

export const productDetailService = { queryProductDetails, getProductDetailById, updateProductDetailById, createProductDetail, removeProductDetailById, deleteProductDetailById }
