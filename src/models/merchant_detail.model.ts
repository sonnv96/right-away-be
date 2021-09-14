import { Document, Model, model, Schema } from "mongoose";
import { paginate } from "../middlewares";

/**
 * Interface to model the MerchantDetail Schema for TypeScript.
 * @param merchantDetailCode:string
 * @param address:object
 * @param time:object
 * @param prices:object
 * @param voteQuantity:number
 * @param merchantId:string
 */

interface Address {
    street: string;
    ward: string;
    district: string;
    city: string;

}
interface Time {
    timeOpen: string;
    timeClosed: string;
}
interface Prices {
    priceFrom: string;
    maxPrice: string;
}
export interface IMerchantDetail extends Document {
    merchantDetailCode: string;
    address: Address;
    time: Time;
    prices: Prices;
    voteQuantity: number;
    merchantId: string;
    deleted: string;
}

export interface IPluginMerchantDetailModel extends Model<IMerchantDetail> {
    paginate(filter: any, options: any): Promise<IMerchantDetail[]>
}

const merchantDetailSchema: Schema = new Schema({
    merchantDetailCode: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    address: {
        street: {
            type: String,
            trim: true,
        },
        ward: {
            type: String,
            trim: true,
        },
        district: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        }
    },
    time: {
        timeOpen: {
            type: String,
            trim: true,
        },
        timeClosed: {
            type: String,
            trim: true,
        }
    },
    prices: {
        priceFrom: {
            type: String,
            trim: true,
        },
        maxPrice: {
            type: String,
            trim: true,
        }
    },
    voteQuantity: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    },
    merchantId: {
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
    collection: 'merchantDetails'
});



// add plugin that converts mongoose to json
// merchantDetailSchema.plugin(toJSON);
merchantDetailSchema.plugin(paginate);

export const MerchantDetail = model<IMerchantDetail>('MerchantDetailModel', merchantDetailSchema) as IPluginMerchantDetailModel;