import { findUsers } from "entity/user/service"
import { Request, Response, NextFunction } from "express"

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json(req.body)
    } catch (error) {
        next(error)
    }
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const users = await findUsers()
    return res.json(users.map(u => u.toJSON()))
}