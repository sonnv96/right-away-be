import { IResponseData } from "../interfaces";
import { Merchant } from "../models";


/**
 * Create a merchant
 * @param {Object} merchantBody
 * @returns {Promise<IResponseData>}
 */
const createMerchant = async (merchantBody) => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: merchantBody }
  const newMerchant: any = new Merchant(merchantBody);
  const merchant = await Merchant.findOne({ merchantCode: merchantBody.merchantCode });
  if (merchant === null) {
    const merchantSave = await newMerchant.save();
    if (merchantSave === null) {
      result.statusCode = 500
    } else {
      result.statusCode = 200
      result.data = merchantSave
    }
  } else {
    result.statusCode = 200
    result.message = "Merchant exited"
  }
  return result;
};


/**
 * Query for merchant
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<IResponseData>}
 */
const queryMerchants = async (filter, options): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const categories = await Merchant.paginate(filter, options);
  result.data = categories
  return result;
};


/**
 * Get merchant by id
 * @param {ObjectId} id
 * @returns {Promise<IResponseData>}
 */
const getMerchantById = async (id): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  let merchant = await Merchant.findById(id);
  if (!merchant) {
    result.statusCode = 400
    result.message = "Merchant not found"
  } else {
    result.data = merchant
  }
  return result;
};


/**
 * Update merchant by id
 * @param {ObjectId} merchantId
 * @param {Object} updateBody
 * @returns {Promise<IResponseData>}
 */
const updateMerchantById = async (id, updateBody): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  let merchant = await Merchant.findOneAndUpdate({ _id: id }, updateBody, { returnOriginal: false })
  if (!merchant) {
    result.statusCode = 400
    result.message = "Merchant not found"
  } else {
    result.data = merchant
  }
  return result;
};


/**
 * Remove merchant by id
 * @param {ObjectId} merchantId
 * @returns {Promise<IResponseData>}
 */
const removeMerchantById = async (id): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const merchant = await Merchant.findOne({ _id: id });
  if (!merchant) {
    result.statusCode = 400
    result.message = "Merchant not found"
  } else {
    merchant.deleted = 'Y'
    await merchant.save()
    result.message = "Merchant deleted Successfully"
  }
  return result;
};


/**
 * Delete merchant by id
 * @param {ObjectId} merchantId
 * @returns {Promise<IResponseData>}
 */
const deleteMerchantById = async (id): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const merchant = await Merchant.findOneAndDelete({ _id: id });
  if (!merchant) {
    result.statusCode = 400
    result.message = "Merchant not found"
  } else {
    result.message = "Merchant deleted Successfully"
  }
  return result;
};

export const merchantService = { queryMerchants, getMerchantById, updateMerchantById, createMerchant, removeMerchantById, deleteMerchantById }
