import { Request, Response } from "express";
import { authService } from "../services";
import { catchAsync } from "../utils";



const authenticate = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const getUserbyToken = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const { access_token } = req.body;
    const result = await authService.getUserbyToken(access_token);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const refreshToken = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.body;
    const result = await authService.refreshToken(refreshToken);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const register = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await authService.createNewUser(req.body);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const changePassword = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await authService.changePassword(req.body);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

export const authController = { authenticate, getUserbyToken, refreshToken, register, changePassword}



