import { Request, Response } from "express";
import { productDetailService } from "../services";
import { catchAsync, pick } from "../utils";


const getProductDetails = catchAsync(async (req: Request, res: Response): Promise<void> => {
    // pick function will get field name from query and field name Specified in array
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'page', 'limit']);

    // filter just query param have deleted == No
    filter.deleted = 'N'
    const result = await productDetailService.queryProductDetails(filter, options);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const getProductDetailById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await productDetailService.getProductDetailById(req.params.productDetailId);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const updateProductDetail = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await productDetailService.updateProductDetailById(req.params.productDetailId, req.body);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const createProductDetail = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await productDetailService.createProductDetail(req.body)
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const removeProductDetail = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await productDetailService.removeProductDetailById(req.params.productDetailId)
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const deleteProductDetail = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await productDetailService.deleteProductDetailById(req.params.productDetailId)
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})


export const productDetailController = {
    getProductDetails, getProductDetailById, updateProductDetail, createProductDetail, removeProductDetail, deleteProductDetail
}

