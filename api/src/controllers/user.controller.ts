import { Request, Response, NextFunction } from "express"


export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    return res.json('TODO: GET ALL USERS')
}
export const create = async (req: Request, res: Response, next: NextFunction) => {
    return res.json('TODO: CREATE USER')
}