import { IResponseData } from "../interfaces";
import { User } from "../models";


/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<IResponseData>}
 */
const createUser = async (userBody) => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: userBody }
  const newUser: any = new User(userBody);
  const user = await User.findOne({ userCode: userBody.userCode });
  if (user === null) {
    const userSave = await newUser.save();
    if (userSave === null) {
      result.statusCode = 500
    } else {
      result.statusCode = 200
      result.data = userSave
    }
  } else {
    result.statusCode = 200
    result.message = "User exited"
  }
  return result;
};


/**
 * Query for user
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<IResponseData>}
 */
const queryUsers = async (filter, options): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const users = await User.paginate(filter, options);
  result.data = users
  return result;
};


/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<IResponseData>}
 */
const getUserById = async (id): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  let user = await User.findOne({ userId: id});
  if (!user) {
    result.statusCode = 400
    result.message = "User not found"
  } else {
    result.data = user
  }
  return result;
};


/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<IResponseData>}
 */
const updateUserById = async (id, updateBody): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  let user = await User.findOneAndUpdate({ userId: id }, updateBody, { returnOriginal: false })
  if (!user) {
    result.statusCode = 400
    result.message = "User not found"
  } else {
    result.data = user
  }
  return result;
};


/**
 * Remove user by id
 * @param {ObjectId} userId
 * @returns {Promise<IResponseData>}
 */
const removeUserById = async (id): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const user = await User.findOne({ userId: id });
  if (!user) {
    result.statusCode = 400
    result.message = "User not found"
  } else {
    user.deleted = 'Y'
    await user.save()
    result.message = "User deleted Successfully"
  }
  return result;
};


/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<IResponseData>}
 */
const deleteUserById = async (id): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const user = await User.findOneAndDelete({ userId: id });
  if (!user) {
    result.statusCode = 400
    result.message = "User not found"
  } else {
    result.message = "User deleted Successfully"
  }
  return result;
};

export const userService = { queryUsers, getUserById, updateUserById, createUser, removeUserById, deleteUserById }
