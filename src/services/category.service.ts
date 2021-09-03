import { Category } from "../models";


interface ResultNewData {
  statusCode: number;
  message: string;
  dataResponse: any;
}
/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<User>}
 */

const createCategory = async (categoryBody) => {
  let result: ResultNewData = { statusCode: 200, message: "Success", dataResponse: categoryBody }
  const newCategory: any = new Category(categoryBody);
  const category = await Category.findOne({ categoryCode: categoryBody.categoryCode });
  if (category === null) {
    const categorySave = await newCategory.save();
    if (categorySave === null) {
      result.statusCode = 500
    } else {
      result.statusCode = 200
      result.dataResponse = categorySave
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
 * @returns {Promise<QueryResult>}
 */
const queryCategories = async (filter, options) => {
  const users = await Category.paginate(filter, options);
  return users;
};

/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
const getCategoryById = async (id) => {

  return Category.findById(id);
};


/**
 * Update category by id
 * @param {ObjectId} categoryId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateCategoryById = async (id, updateBody) => {
  return Category.findOneAndUpdate({ _id: id }, updateBody);
};

// /**
//  * Delete user by id
//  * @param {ObjectId} userId
//  * @returns {Promise<User>}
//  */
// const deleteUserById = async (userId) => {
//   const user = await getUserById(userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   await user.remove();
//   return user;
// };

export const categoryService = { queryCategories, getCategoryById, updateCategoryById, createCategory }
