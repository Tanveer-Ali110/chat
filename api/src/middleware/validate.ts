import { Request, Response, NextFunction } from "express";
import { ZodSchema } from 'zod';


export const validateBody = <T>(schema: ZodSchema<T>) => (req: Request, _: Response, next: NextFunction) => {

    const body = req.body
    const validationResult = schema.safeParse(body);

    if (!validationResult.success) {
        throw new Error("validation failed")
    }
    req.body = validationResult.data
    next()
}