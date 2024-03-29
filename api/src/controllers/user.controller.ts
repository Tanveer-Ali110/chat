import { findByCredential, createUser, findUsers } from "entity/user/service"
import { Request, Response, NextFunction } from "express"

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await createUser(req.body)
        return res.json(user)
    } catch (error) {
        next(error)
    }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const user = await findByCredential(email, password)
        const token = await user.generateAccessToken()
        return res.status(200).json({ user, token })
    } catch (error) {
        next(error)
    }
}

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        return res.json(user)
    } catch (error) {
        next(error)
    }
}
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const users = await findUsers()
    return res.json(users.map(u => u.toJSON()))
}