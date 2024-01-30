import { Model, model, Schema } from 'mongoose';

import { encryptPassword, generateAuthToken } from './trigger';
import { head, isEmpty } from 'lodash';
import { compare } from 'bcryptjs';
import { IUser, IUserModel } from '@interfaces/user.interface';
import { BadRequestException, UnAuthorizedException } from '@utils/exceptions';

var validateEmail = function (email: string) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

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
    }
})

UserSchema.pre("save", encryptPassword);

UserSchema.statics.findByCredentials = async (
    email: string,
    password: string
) => {
    const users = await User.find({ email });
    if (isEmpty(users)) {
        throw new UnAuthorizedException("User does not exist");
    }
    const user: any = head(users);
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
        throw new BadRequestException("Password does not match");
    }
    return user;
};

// UserSchema.methods.generateAuthToken = generateAuthToken
// UserSchema.set("toJSON", {
//     virtuals: true,
// });

export const User = model<IUser, IUserModel>("User", UserSchema);
