import { IResponseData } from "../interfaces";
import { MerchantDetail } from "../models";


/**
 * Create a merchantDetail
 * @param {Object} merchantDetailBody
 * @returns {Promise<IResponseData>}
 */
const createMerchantDetail = async (merchantDetailBody) => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: merchantDetailBody }
  const newMerchantDetail: any = new MerchantDetail(merchantDetailBody);
  const merchantDetail = await MerchantDetail.findOne({ merchantDetailCode: merchantDetailBody.merchantDetailCode });
  if (merchantDetail === null) {
    const merchantDetailSave = await newMerchantDetail.save();
    if (merchantDetailSave === null) {
      result.statusCode = 500
    } else {
      result.statusCode = 200
      result.data = merchantDetailSave
    }
  } else {
    result.statusCode = 200
    result.message = "MerchantDetail exited"
  }
  return result;
};


/**
 * Query for merchantDetail
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<IResponseData>}
 */
const queryMerchantDetails = async (filter, options): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const categories = await MerchantDetail.paginate(filter, options);
  result.data = categories
  return result;
};


/**
 * Get merchantDetail by id
 * @param {ObjectId} id
 * @returns {Promise<IResponseData>}
 */
const getMerchantDetailById = async (id): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  let merchantDetail = await MerchantDetail.findById(id);
  if (!merchantDetail) {
    result.statusCode = 400
    result.message = "MerchantDetail not found"
  } else {
    result.data = merchantDetail
  }
  return result;
};


/**
 * Update merchantDetail by id
 * @param {ObjectId} merchantDetailId
 * @param {Object} updateBody
 * @returns {Promise<IResponseData>}
 */
const updateMerchantDetailById = async (id, updateBody): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  let merchantDetail = await MerchantDetail.findOneAndUpdate({ _id: id }, updateBody, { returnOriginal: false })
  if (!merchantDetail) {
    result.statusCode = 400
    result.message = "MerchantDetail not found"
  } else {
    result.data = merchantDetail
  }
  return result;
};


/**
 * Remove merchantDetail by id
 * @param {ObjectId} merchantDetailId
 * @returns {Promise<IResponseData>}
 */
const removeMerchantDetailById = async (id): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const merchantDetail = await MerchantDetail.findOne({ _id: id });
  if (!merchantDetail) {
    result.statusCode = 400
    result.message = "MerchantDetail not found"
  } else {
    merchantDetail.deleted = 'Y'
    await merchantDetail.save()
    result.message = "MerchantDetail deleted Successfully"
  }
  return result;
};


/**
 * Delete merchantDetail by id
 * @param {ObjectId} merchantDetailId
 * @returns {Promise<IResponseData>}
 */
const deleteMerchantDetailById = async (id): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const merchantDetail = await MerchantDetail.findOneAndDelete({ _id: id });
  if (!merchantDetail) {
    result.statusCode = 400
    result.message = "MerchantDetail not found"
  } else {
    result.message = "MerchantDetail deleted Successfully"
  }
  return result;
};

export const merchantDetailService = { queryMerchantDetails, getMerchantDetailById, updateMerchantDetailById, createMerchantDetail, removeMerchantDetailById, deleteMerchantDetailById }
