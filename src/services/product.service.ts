import { IResponseData } from "../interfaces";
import { Product } from "../models";


/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promise<IResponseData>}
 */
const createProduct = async (productBody) => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: productBody }
  const newProduct: any = new Product(productBody);
  const product = await Product.findOne({ productCode: productBody.productCode });
  if (product === null) {
    const productSave = await newProduct.save();
    if (productSave === null) {
      result.statusCode = 500
    } else {
      result.statusCode = 200
      result.data = productSave
    }
  } else {
    result.statusCode = 200
    result.message = "Product exited"
  }
  return result;
};


/**
 * Query for product
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<IResponseData>}
 */
const queryProducts = async (filter, options): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const categories = await Product.paginate(filter, options);
  result.data = categories
  return result;
};


/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<IResponseData>}
 */
const getProductById = async (id): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  let product = await Product.findById(id);
  if (!product) {
    result.statusCode = 400
    result.message = "Product not found"
  } else {
    result.data = product
  }
  return result;
};


/**
 * Update product by id
 * @param {ObjectId} productId
 * @param {Object} updateBody
 * @returns {Promise<IResponseData>}
 */
const updateProductById = async (id, updateBody): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  let product = await Product.findOneAndUpdate({ _id: id }, updateBody, { returnOriginal: false })
  if (!product) {
    result.statusCode = 400
    result.message = "Product not found"
  } else {
    result.data = product
  }
  return result;
};


/**
 * Remove product by id
 * @param {ObjectId} productId
 * @returns {Promise<IResponseData>}
 */
const removeProductById = async (id): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const product = await Product.findOne({ _id: id });
  if (!product) {
    result.statusCode = 400
    result.message = "Product not found"
  } else {
    product.deleted = 'Y'
    await product.save()
    result.message = "Product deleted Successfully"
  }
  return result;
};


/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<IResponseData>}
 */
const deleteProductById = async (id): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const product = await Product.findOneAndDelete({ _id: id });
  if (!product) {
    result.statusCode = 400
    result.message = "Product not found"
  } else {
    result.message = "Product deleted Successfully"
  }
  return result;
};

export const productService = { queryProducts, getProductById, updateProductById, createProduct, removeProductById, deleteProductById }
