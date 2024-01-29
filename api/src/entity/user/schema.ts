import { model, Schema } from 'mongoose';

import { encryptPassword } from './trigger';


var validateEmail = function (email: string) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

export const UserSchema = new Schema({
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
})


UserSchema.pre("save", encryptPassword);

UserSchema.set("toJSON", {
    virtuals: true,
});

export const User = model("User", UserSchema);