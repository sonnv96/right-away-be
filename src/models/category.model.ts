import { Document, Model, model, Schema } from "mongoose";
import { paginate } from "../middlewares";

/**
 * Interface to model the User Schema for TypeScript.
 * @param categoryCode:string
 * @param categoryName:string
 */
export interface ICategory extends Document {
    categoryCode: string;
    categoryName: string;
    deleted: string;
}

export interface IPluginCategoryModel extends Model<ICategory> {
    paginate(filter: any, options: any): Promise<ICategory[]>
}

const categorySchema: Schema = new Schema({
    categoryCode: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    categoryName: {
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
    collection: 'categories'
});



// add plugin that converts mongoose to json
// categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

export const Category =  model<ICategory>('CategoryModel', categorySchema) as IPluginCategoryModel;