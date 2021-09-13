import { Document, Model, model, Schema } from "mongoose";
import { paginate } from "../middlewares";

/**
 * Interface to model the User Schema for TypeScript.
 * @param merchantId:string
 * @param name:string
 * @param productGroupCode:string
 */
export interface IProductGroup extends Document {
    merchantId: string;
    name: string;
    productGroupCode: string;
    deleted: string;
}

export interface IPluginProductGroupModel extends Model<IProductGroup> {
    paginate(filter: any, options: any): Promise<IProductGroup[]>
}

const productGroupSchema: Schema = new Schema({
    merchantId: {
        type: String,
        required: true,
        trim: true,
    },
    productGroupCode: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
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
    collection: 'productGroups'
});



// add plugin that converts mongoose to json
// productGroupSchema.plugin(toJSON);
productGroupSchema.plugin(paginate);

export const ProductGroup = model<IProductGroup>('ProductGroupModel', productGroupSchema) as IPluginProductGroupModel;