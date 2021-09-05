import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { catchAsync, pick } from "../utils";


const getUsers = catchAsync(async (req: Request, res: Response): Promise<void> => {
     const filter = pick(req.query, ['name', 'role']);
     const options = pick(req.query, ['sortBy', 'page', 'limit']);
     filter.deleted = 'N'
     const result = await userService.queryUsers(filter, options);
     res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const getUserById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await userService.getUserById(req.params.userId);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const updateUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await userService.updateUserById(req.params.userId, req.body);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const removeUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await userService.removeUserById(req.params.userId)
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const deleteUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await userService.deleteUserById(req.params.userId)
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

export const userController = {getUsers, getUserById, updateUser, removeUser, deleteUser}