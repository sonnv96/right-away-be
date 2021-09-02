import { Request, Response } from "express";
import { UserModel } from "../models";
import { catchAsync } from "../utils";


const getUsers = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const list = await UserModel.find();
    res.json({ list });
})

const getUserById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const user = await UserModel.findOne({ userId: req.params.userId });
    if (user === null) {
        res.sendStatus(404);
    } else {
        res.json(user);
    }
})

const updateUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const user = await UserModel.findOneAndUpdate({ userId: req.params.userId }, req.body);
    if (user === null) {
        res.sendStatus(404);
    } else {
        const updateUser = { _id: req.params.userId, ...req.body };
        res.json({ status: res.status, data: updateUser });
    }
})

const removeUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const user = await UserModel.findOne({ userId: req.params.userId });
    if (user === null) {
        res.sendStatus(404);
    } else {
        user.deleted = 'Y'
        await user.save()
        res.json({ response: "User deleted Successfully" });
    }
})

const deleteUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const user = await UserModel.findOneAndDelete({ userId: req.params.userId });
    if (user === null) {
        res.sendStatus(404);
    } else {
        res.json({ response: "User deleted Successfully" });
    }
})

export const userController = {getUsers, getUserById, updateUser, removeUser, deleteUser}