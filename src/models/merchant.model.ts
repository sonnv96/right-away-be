import { Document, Model, model, Schema } from "mongoose";
import { paginate } from "../middlewares";

/**
 * Interface to model the Merchant Schema for TypeScript.
 * @param merchantCode:string
 * @param name:string
 * @param productGroupId:string
 * @param categoryId:string
 */
export interface IMerchant extends Document {
    merchantCode: string;
    name: string;
    productGroupId: string;
    categoryId: string;
    deleted: string;
}

export interface IPluginMerchantModel extends Model<IMerchant> {
    paginate(filter: any, options: any): Promise<IMerchant[]>
}

const merchantSchema: Schema = new Schema({
    merchantCode: {
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
    productGroupId: {
        type: String,
        required: true,
        trim: true,
    },
    categoryId: {
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
    collection: 'merchants'
});

merchantSchema.plugin(paginate);

export const Merchant = model<IMerchant>('MerchantModel', merchantSchema) as IPluginMerchantModel;