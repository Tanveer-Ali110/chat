
import { hash } from "bcryptjs";

export const encryptPassword = async function (this: any, next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await hash(user.password, 8);
    }
    next();
}