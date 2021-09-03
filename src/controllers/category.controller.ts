import { Request, Response } from "express";
import httpStatus from "http-status";
import { Category } from "../models";
import { categoryService } from "../services";
import { catchAsync, pick } from "../utils";


const getCategories = catchAsync(async (req: Request, res: Response): Promise<void> => {
    // pick function will get field name from query and field name Specified in array
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'page', 'limit']);

    // filter just query param have deleted == No
    filter.deleted = 'N'
    const list = await categoryService.queryCategories(filter, options);
    res.json({ list });
})

const getCategoryById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const category = await categoryService.getCategoryById(req.params.categoryId);
    if (!category) {
        res.status(httpStatus.NOT_FOUND).send("Category not found");
    } else {
        res.json(category);
    }
})

const updateCategory = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const category = await categoryService.updateCategoryById(req.params.categoryId, req.body);
    if (!category) {
        res.status(httpStatus.NOT_FOUND).send("Category not found");
    } else {
        const updateCategory = { _id: req.params.categoryId, ...req.body };
        res.json({ status: res.status, data: category });
    }
})

const createCategory = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const resultCreated = await categoryService.createCategory(req.body)
    res.status(resultCreated.statusCode).json({ message: resultCreated.message, data: resultCreated.dataResponse });
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

