import { Request, Response } from "express";
import { merchantService } from "../services";
import { catchAsync, pick } from "../utils";


const getMerchants = catchAsync(async (req: Request, res: Response): Promise<void> => {
    // pick function will get field name from query and field name Specified in array
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'page', 'limit']);

    // filter just query param have deleted == No
    filter.deleted = 'N'
    const result = await merchantService.queryMerchants(filter, options);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const getMerchantById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await merchantService.getMerchantById(req.params.merchantId);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const updateMerchant = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await merchantService.updateMerchantById(req.params.merchantId, req.body);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const createMerchant = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await merchantService.createMerchant(req.body)
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const removeMerchant = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await merchantService.removeMerchantById(req.params.merchantId)
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const deleteMerchant = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await merchantService.deleteMerchantById(req.params.merchantId)
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})


export const merchantController = {
    getMerchants, getMerchantById, updateMerchant, createMerchant, removeMerchant, deleteMerchant
}

