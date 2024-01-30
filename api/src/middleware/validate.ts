import { JWT_SECRET } from "@config/environment";
import { findUserByAuth } from "@entity/user/service";
import { DataStoredInToken } from "@interfaces/auth.interface";
import { IUser } from "@interfaces/user.interface";
import { UnAuthorizedException, ValidationException } from "@utils/exceptions";
import { Request, Response, NextFunction } from "express";
import { verify, Secret } from "jsonwebtoken";

import { ZodSchema } from 'zod';
import { findUserFromToken } from "./socketAuth";


export const validateBody = <T>(schema: ZodSchema<T>) => (req: Request, _: Response, next: NextFunction) => {
    try {

        const body = req.body
        const validationResult = schema.safeParse(body);

        if (!validationResult.success) {
            const message = (validationResult as any).error.issues.map(issue => {
                const path = issue.path.join(".");
                const errorMessage = `${path} is ${issue.message}`;
                return errorMessage;
            });
            throw new ValidationException(message[0])
        }
        req.body = validationResult.data
        next();
    } catch (error) {
        next(error);
    }
}

export const validateAccessToken = async (req: Request, _: Response, next: NextFunction) => {
    try {
        const headerToken = req.headers?.authorization?.split(" ")[1];
        if (!headerToken) {
            throw new UnAuthorizedException("UNAUTHORIZED_USER");
        }
        if (headerToken) {
            req.user = await findUserFromToken(headerToken);
            req.token = headerToken;
        }

        if (!req.user) {
            throw new UnAuthorizedException("USER_NOT_FOUND");
        }
        next();
    } catch (error) {
        next(error);
    }
}