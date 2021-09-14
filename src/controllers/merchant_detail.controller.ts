import { Request, Response } from "express";
import { merchantDetailService } from "../services";
import { catchAsync, pick } from "../utils";


const getMerchantDetails = catchAsync(async (req: Request, res: Response): Promise<void> => {
    // pick function will get field name from query and field name Specified in array
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'page', 'limit']);

    // filter just query param have deleted == No
    filter.deleted = 'N'
    const result = await merchantDetailService.queryMerchantDetails(filter, options);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const getMerchantDetailById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await merchantDetailService.getMerchantDetailById(req.params.merchantDetailId);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const updateMerchantDetail = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await merchantDetailService.updateMerchantDetailById(req.params.merchantDetailId, req.body);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const createMerchantDetail = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await merchantDetailService.createMerchantDetail(req.body)
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const removeMerchantDetail = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await merchantDetailService.removeMerchantDetailById(req.params.merchantDetailId)
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const deleteMerchantDetail = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await merchantDetailService.deleteMerchantDetailById(req.params.merchantDetailId)
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})


export const merchantDetailController = {
    getMerchantDetails, getMerchantDetailById, updateMerchantDetail, createMerchantDetail, removeMerchantDetail, deleteMerchantDetail
}

