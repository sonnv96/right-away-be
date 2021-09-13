import { Document, Model, model, Schema } from "mongoose";
import { paginate } from "../middlewares";

/**
 * Interface to model the ProductDetail Schema for TypeScript.
 * @param productName:string
 * @param productImage:string
 * @param description:string
 * @param price:string
 * @param orderQuantity:string
 * @param likeQuantity:string
 * @param productId:string
 * @param quantity:string
 */
export interface IProductDetail extends Document {
    productName: string;
    productImage: string;
    description: string;
    price: string;
    orderQuantity: number;
    likeQuantity: number;
    quantity: number;
    productId: string;
    deleted: string;
}

export interface IPluginProductDetailModel extends Model<IProductDetail> {
    paginate(filter: any, options: any): Promise<IProductDetail[]>
}

const productDetailSchema: Schema = new Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    productImage: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: String,
        required: true,
        trim: true,
        default: "0đ"
    },
    orderQuantity: {
        type: Number,
        trim: true,
        default: 0
    },
    likeQuantity: {
        type: Number,
        trim: true,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0,
        trim: true,
    },
    productId: {
        type: String,
        required: true,
        trim: true,
    },
    deleted: {
        type: String,
        required: true,
        default: "N"
    }
}, {
    timestamps: true,
    collection: 'productDetails'
});



// add plugin that converts mongoose to json
// productDetailSchema.plugin(toJSON);
productDetailSchema.plugin(paginate);

export const ProductDetail = model<IProductDetail>('ProductDetailModel', productDetailSchema) as IPluginProductDetailModel;