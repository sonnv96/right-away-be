import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import systemConstant from "../config/system-constant";
import { generateUserId } from "../middlewares/generateUserID";
import { UserModel } from "../models";
import { catchAsync } from "../utils";



const authenticate = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
        let userResp: any = {}
        let user = await UserModel.findOne({ username: username });
        if (!user) {
            return res.status(200).send({
                success: false,
                error: {
                    message: 'User not found',
                    fieldName: 'username'
                }
            });
        }

        const matchPasswords = await user.comparePassword(password, user.password)
        if (!matchPasswords) {
            return res.status(200).send({
                success: false,
                error: {
                    message: 'Password is not correct',
                    fieldName: 'password'
                }
            });
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

        res.status(200).send({
            success: true,
            message: 'Token generated Successfully',
            user: userResp
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.toString()
        });
    }
})

const getUserbyToken = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const { access_token } = req.body;
    try {
        let userResp: any = {}
        const decoded = jwt.decode(access_token, { complete: true });

        let user = await UserModel.findOne({ username: decoded.payload.username });
        if (!user) {
            return res.status(200).send({
                success: false,
                error: {
                    message: 'User not found or token is not correct',
                    fieldName: 'username'
                }
            });
        }
        Object.assign(userResp, { access_token: access_token })
        Object.assign(userResp, { data: JSON.parse(JSON.stringify(user)) })


        res.status(200).send({
            success: true,
            message: 'Token generated Successfully',
            user: userResp
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.toString()
        });
    }
})

const refreshToken = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.body;
    if (refreshToken) {
        try {
            const user = await UserModel.findOne({ refreshToken: refreshToken });
            if (!user) {
                return res.status(200).send({
                    success: false,
                    message: 'Token is not correct'
                });
            }

            jwt.verify(refreshToken, systemConstant.refreshTokenJwtSecret as string,
                (err: any, user: any) => {
                    console.log(err)

                    if (err) return res.sendStatus(403)
                    const token = jwt.sign({ user }, systemConstant.jwtSecret, {
                        expiresIn: systemConstant.expiresIn
                    });
                    res.status(200).send({
                        success: true,
                        data: token
                    });
                })
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString()
            });
        }
    } else {
        res.status(400).json({
            message: 'Invalid request',
        });
    }

})

const register = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const { username, email, password, photoUrl, displayName } = req.body;
    try {
        const user = new UserModel({
            username,
            email,
            photoUrl,
            displayName,
            password,
            userId: generateUserId()
        });

        const newUser = await user.save();

        res.status(200).send({
            success: false,
            message: 'User Successfully created',
            data: newUser
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.toString()
        });
    }
})

const changePassword = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const { oldPassword, newPassword, username } = req.body;

    try {
        if (!(oldPassword && newPassword)) {
            res.status(200).send({ error: 'oldPassword and newPassword are mandatory!' })
        }
        const user = await UserModel.findOne({ username: username });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        const matchPasswords = await user.comparePassword(oldPassword, user.password)
        if (!matchPasswords) {
            return res.status(200).send({
                success: false,
                message: 'Not authorized'
            });
        }

        user.password = newPassword


        await user.save();

        res.status(200).send({
            success: false,
            message: 'Password has changed',
            data: user
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.toString()
        });
    }
})

export const authController = { authenticate, getUserbyToken, refreshToken, register, changePassword}



