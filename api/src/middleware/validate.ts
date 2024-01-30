import { findUserByAuth } from "@entity/user/service";
import { DataStoredInToken } from "@interfaces/auth.interface";
import { IUser } from "@interfaces/user.interface";
import { UnAuthorizedException, ValidationException } from "@utils/exceptions";
import { Request, Response, NextFunction } from "express";

import { verify, Secret } from "jsonwebtoken";

import { ZodSchema } from 'zod';


export const validateBody = <T>(schema: ZodSchema<T>) => (req: Request, res: Response, next: NextFunction) => {

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
    next()
}

export const validateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const headerToken = req.headers?.authorization?.split(" ")[1];
        if (!headerToken) {
            throw new UnAuthorizedException("UNAUTHORIZED_USER");
        }

        if (headerToken) {
            const decoded = verify(
                headerToken,
                "JWT_SECRET" as Secret
            ) as DataStoredInToken;
            const tokenExpired = Date.now() < decoded.iat!;
            if (tokenExpired) {
                throw new UnAuthorizedException("JWT_EXPIRED");
            }
            req.user = (await findUserByAuth(
                decoded._id as string,
                headerToken
            )) as IUser;
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