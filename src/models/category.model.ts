import { Document, model, Schema } from "mongoose";


/**
* @swagger
* definitions:
*  CategoryModel:
*    type: object
*    properties:
*      categoryCode:
*        type: string
*      categoryName:
*        type: string
*    xml:
*      name: UserModel
*/

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

export const Category =  model<ICategory>('CategoryModel', categorySchema);