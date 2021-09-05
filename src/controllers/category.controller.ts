import { Request, Response } from "express";
import { categoryService } from "../services";
import { catchAsync, pick } from "../utils";


const getCategories = catchAsync(async (req: Request, res: Response): Promise<void> => {
    // pick function will get field name from query and field name Specified in array
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'page', 'limit']);

    // filter just query param have deleted == No
    filter.deleted = 'N'
    const result = await categoryService.queryCategories(filter, options);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const getCategoryById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await categoryService.getCategoryById(req.params.categoryId);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const updateCategory = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await categoryService.updateCategoryById(req.params.categoryId, req.body);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const createCategory = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await categoryService.createCategory(req.body)
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const removeCategory = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await categoryService.removeCategoryById(req.params.categoryId)
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const deleteCategory = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await categoryService.deleteCategoryById(req.params.categoryId)
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})


export const categoryController = {
    getCategories, getCategoryById, updateCategory, createCategory, removeCategory, deleteCategory
}

