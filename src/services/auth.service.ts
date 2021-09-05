import jwt from 'jsonwebtoken';
import systemConstant from "../config/system-constant";
import { IResponseData } from "../interfaces";
import { generateUserId } from "../middlewares/generateUserID";
import { User } from "../models";


/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<IResponseData>}
 */
const login = async (username: string, password: string): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  try {
    let userResp: any = {}
    let user = await User.findOne({ username: username });
    if (!user) {
      result.message = 'User not found'
      result.statusCode = 404
      return result;
    }

    const matchPasswords = await user.comparePassword(password, user.password)
    if (!matchPasswords) {
      result.message = 'Password is not correct'
      return result;

    }

    const token = await jwt.sign({ username }, systemConstant.jwtSecret, {
      expiresIn: systemConstant.expiresIn
    });

    const refreshToken = await jwt.sign({ username }, systemConstant.refreshTokenJwtSecret, {
      expiresIn: systemConstant.refreshTokenExpiresIn
    });

    user.refreshToken = refreshToken
    await user.save();

    Object.assign(userResp, { access_token: token })
    Object.assign(userResp, { data: JSON.parse(JSON.stringify(user)) })

    result.message = 'Token generated Successfully'
    result.data = userResp
    return result;

  } catch (err) {
    result.message = err.toString()
    result.statusCode = 500
    return result;

  }
}


/**
 * Query for category
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<IResponseData>}
 */
const getUserbyToken = async (access_token: string): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  try {
    let userResp: any = {}
    const decoded = jwt.decode(access_token, { complete: true });

    let user = await User.findOne({ username: decoded.payload.username });
    if (!user) {
      result.message = 'User not found or token is not correct'
      result.statusCode = 404
      return result
    }
    Object.assign(userResp, { access_token: access_token })
    Object.assign(userResp, { data: JSON.parse(JSON.stringify(user)) })

    result.statusCode = 200
    result.data = userResp
    return result

  } catch (err) {
    result.message = err.toString()
    result.statusCode = 500
    return result;
  }
};


/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<IResponseData>}
 */
const refreshToken = async (refreshToken: string): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  if (refreshToken) {
    try {
      const user = await User.findOne({ refreshToken: refreshToken });
      if (!user) {
        result.message = 'Token is not correct'
        return result;
      }

      jwt.verify(refreshToken, systemConstant.refreshTokenJwtSecret as string,
        (err: any, user: any) => {
          if (err) {
            result.statusCode = 403
            result.message = 'Forbiden'
            return result;
          }
          const token = jwt.sign({ user }, systemConstant.jwtSecret, {
            expiresIn: systemConstant.expiresIn
          });
          result.data = token
        })
      return result

    } catch (err) {
      result.message = err.toString()
      result.statusCode = 500
      return result;
    }
  } else {
    result.message = "Invalid request"
    result.statusCode = 400
    return result;

  }
};


/**
 * Update category by id
 * @param {ObjectId} categoryId
 * @param {Object} updateBody
 * @returns {Promise<IResponseData>}
 */
const createNewUser = async (bodyCreate: any): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const { username, email, password, photoUrl, displayName } = bodyCreate
  try {
    const user = new User({
      username,
      email,
      photoUrl,
      displayName,
      password,
      userId: generateUserId()
    });

    const newUser = await user.save();

    result.message = 'User Successfully created'
    result.statusCode = 200
    result.data = newUser
    return result
  } catch (err) {
    result.message = err.toString()
    result.statusCode = 500
    return result;
  }
};


/**
 * Remove category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<IResponseData>}
 */
const changePassword = async (updatePassword: any): Promise<IResponseData> => {
  let result: IResponseData = { statusCode: 200, message: "Success", data: null }
  const { oldPassword, newPassword, username } = updatePassword
  try {
    if (!(oldPassword && newPassword)) {
      result.message = 'oldPassword and newPassword are mandatory!'
      return result;
    }
    const user = await User.findOne({ username: username });
    if (!user) {
      result.message = 'User not found'
      result.statusCode = 404
      return result;
    }

    const matchPasswords = await user.comparePassword(oldPassword, user.password)
    if (!matchPasswords) {
      result.message = 'Password is correct'
      result.statusCode = 200
      return result;
    }

    user.password = newPassword


    await user.save();

    result.message = 'Password has changed'
    result.statusCode = 200
    return result;

  } catch (err) {
    result.message = err.toString()
    result.statusCode = 500
    return result;
  }
};



export const authService = { login, refreshToken, getUserbyToken, createNewUser, changePassword }
