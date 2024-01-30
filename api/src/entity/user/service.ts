import { IUser, createUserType } from "@interfaces/user.interface"
import { User } from "./schema"
import { head, isEmpty } from "lodash"
import { compare } from "bcryptjs"
import { BadRequestException, UnAuthorizedException } from "@utils/exceptions"

export const createUser = async (data: createUserType) => {
    return User.create(data)
}
export const findUsers = async () => {
    return User.find()
}
export const findUserByEmail = async (email: string) => {
    return User.find({ email })
}
export const findByCredential = async (email: string, password: string) => {
    const users = await findUserByEmail(email);
    if (isEmpty(users)) {
        throw new UnAuthorizedException("User does not exist");
    }
    const user: IUser = head(users);
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
        throw new BadRequestException("Password does not match");
    }
    return user;
}
export const findUserByAuth = async (_id: string, accessToken: string) => {
    return User.findOne({ _id, accessTokens: accessToken });
};