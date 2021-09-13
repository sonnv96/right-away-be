import { Document, Model, model, Schema } from "mongoose";
import { paginate } from "../middlewares";

/**
 * Interface to model the Product Schema for TypeScript.
 * @param productCode:string
 * @param productName:string
 * @param productGroupId:string
 */
export interface IProduct extends Document {
    productCode: string;
    productName: string;
    productGroupId: string;
    deleted: string;
}

export interface IPluginProductModel extends Model<IProduct> {
    paginate(filter: any, options: any): Promise<IProduct[]>
}

const productSchema: Schema = new Schema({
    productCode: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    productGroupId: {
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
    collection: 'products'
});



// add plugin that converts mongoose to json
// productSchema.plugin(toJSON);
productSchema.plugin(paginate);

export const Product = model<IProduct>('ProductModel', productSchema) as IPluginProductModel;