import { model, Schema } from 'mongoose';

import { encryptPassword, generateAccessToken } from './trigger';
import { IUser, IUserModel } from '@interfaces/user.interface';

var validateEmail = function (email: string) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

declare global {
    // eslint-disable-next-line no-unused-vars
    namespace Express {
        // eslint-disable-next-line no-unused-vars
        interface Request {
            user: IUser;
            token: string;
        }
    }
}

export const UserSchema = new Schema<IUser, IUserModel>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
    },
    contact_no: {
        type: Number,
        required: false,
    },
    accessTokens: [
        {
            type: String
        }
    ]
})

UserSchema.pre("save", encryptPassword);

UserSchema.methods.generateAccessToken = generateAccessToken

UserSchema.set("toJSON", {
    virtuals: true,
});

export const User = model<IUser, IUserModel>("User", UserSchema);
