import { Request, Response } from "express";
import { productGroupService } from "../services";
import { catchAsync, pick } from "../utils";


const getProductGroups = catchAsync(async (req: Request, res: Response): Promise<void> => {
    // pick function will get field name from query and field name Specified in array
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'page', 'limit']);

    // filter just query param have deleted == No
    filter.deleted = 'N'
    const result = await productGroupService.queryProductGroups(filter, options);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const getProductGroupById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await productGroupService.getProductGroupById(req.params.productGroupId);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const updateProductGroup = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await productGroupService.updateProductGroupById(req.params.productGroupId, req.body);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const createProductGroup = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await productGroupService.createProductGroup(req.body)
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const removeProductGroup = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await productGroupService.removeProductGroupById(req.params.productGroupId)
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const deleteProductGroup = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await productGroupService.deleteProductGroupById(req.params.productGroupId)
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})


export const productGroupController = {
    getProductGroups, getProductGroupById, updateProductGroup, createProductGroup, removeProductGroup, deleteProductGroup
}

