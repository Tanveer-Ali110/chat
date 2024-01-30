import { createUserType } from "@interfaces/user.interface"
import { User } from "./schema"


export const createUser = async (data: createUserType) => {
    return User.create(data)
}

export const findByCredential = async (email: string, password: string) => {
    return User.findByCredentials(email, password)
}
export const findUsers = async () => {
    return User.find()
}