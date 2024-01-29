import { User } from "./schema"


export const findUsers = async () => {
    return User.find()
}