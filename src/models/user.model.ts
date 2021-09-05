import { Document, Model, model, Schema } from "mongoose";
import validator from 'validator';
import { paginate } from "../middlewares";
import { CryptoHash } from "../middlewares/cryptoHash";



/**
 * Interface to model the User Schema for TypeScript.
 * @param username:string
 * @param email:string
 * @param displayName:string
 * @param photoUrl:string
 * @param password:string
 * @param tokens:any
 */
export interface IUser extends Document {
    username: string;
    email: string;
    displayName: string;
    photoUrl: string;
    password: string;
    refreshToken: string;
    userId: string;
    deleted: string;
    comparePassword(candidatePassword: string, currentPassword: string): boolean;

}

export interface IPluginUserModel extends Model<IUser> {
    paginate(filter: any, options: any): Promise<IUser[]>
}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true,
        trim: true,
    },
    photoUrl: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email address')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 3
    },
    refreshToken: {
        type: String,
    },
    userId: {
        type: String,
        required: true,
        minLength: 3,
        unique: true
    },
    deleted: {
        type: String,
        required: true,
        default: "N"
    },
}, {
    timestamps: true,
    collection: 'users'
});

userSchema.plugin(paginate);

userSchema.pre<IUser>("save", async function save(next) {
    const user = this;
    if (user.isModified('password')) {
        const cryptoHash: CryptoHash = new CryptoHash()
        const hash = await cryptoHash.hash(this.password);
        user.password = hash.toString();
    }
    next()
});

userSchema.methods.comparePassword = async (candidatePassword: string, currentPassword: string) => {
    const cryptoHash: CryptoHash = new CryptoHash()
    return await cryptoHash.verify(candidatePassword, currentPassword)
};
// UserModel is name export, if set name collection, will get this name for collection
export const User = model<IUser>('UserModel', userSchema) as IPluginUserModel;