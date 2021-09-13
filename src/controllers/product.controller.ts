import { Request, Response } from "express";
import { productService } from "../services";
import { catchAsync, pick } from "../utils";


const getProducts = catchAsync(async (req: Request, res: Response): Promise<void> => {
    // pick function will get field name from query and field name Specified in array
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'page', 'limit']);

    // filter just query param have deleted == No
    filter.deleted = 'N'
    const result = await productService.queryProducts(filter, options);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const getProductById = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await productService.getProductById(req.params.productId);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const updateProduct = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await productService.updateProductById(req.params.productId, req.body);
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const createProduct = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await productService.createProduct(req.body)
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const removeProduct = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await productService.removeProductById(req.params.productId)
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})

const deleteProduct = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await productService.deleteProductById(req.params.productId)
    res.status(result.statusCode).json({ message: result.message, data: result.data });
})


export const productController = {
    getProducts, getProductById, updateProduct, createProduct, removeProduct, deleteProduct
}

