import { Request, Response } from "express";
import { Category } from "../models";
import { categoryService } from "../services";
import { catchAsync, pick } from "../utils";


const getCategories = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const filter = pick(req.query, ['name', 'role']);
    // const options = pick(req.query, ['sortBy', '2', '1']);
    const options = {limit: 1, page: 1};
    // const list = await Category.find();
    const list = await categoryService.queryCategories(filter, options);
    res.json({ list });
})

const getCategoryById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const category = await Category.findOne({ _id: req.params.categoryId });
    if (category === null) {
        res.sendStatus(404);
    } else {
        res.json(category);
    }
})

const updateCategory = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const category = await Category.findOneAndUpdate({ _id: req.params.categoryId }, req.body);
    if (category === null) {
        res.sendStatus(404);
    } else {
        const updateCategory = { _id: req.params.categoryId, ...req.body };
        res.json({ status: res.status, data: updateCategory });
    }
})

const createCategory = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const newCategory: any = new Category(req.body);
    const category = await Category.findOne({ _id: req.body.categoryId });
    if (category === null) {
        const result = await newCategory.save();
        if (result === null) {
            res.sendStatus(500);
        } else {
            res.status(201).json({ status: 201, data: result });
        }

    } else {
        res.json("Category exited");
    }
})

const removeCategory = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const category = await Category.findOne({ _id: req.params.categoryId });
    if (category === null) {
        res.sendStatus(404);
    } else {
        category.deleted = 'Y'
        await category.save()
        res.json({ response: "User deleted Successfully" });
    }
})

const deleteCategory = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const category = await Category.findOneAndDelete({ _id: req.params.categoryId });
    if (category === null) {
        res.sendStatus(404);
    } else {
        res.json({ response: "User deleted Successfully" });
    }
})


export const categoryController = {
    getCategories, getCategoryById, updateCategory, createCategory, removeCategory, deleteCategory
}

