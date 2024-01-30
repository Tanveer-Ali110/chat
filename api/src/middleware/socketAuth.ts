import { JWT_SECRET } from "@config/environment";
import { findUserByAuth } from "@entity/user/service";
import { DataStoredInToken } from "@interfaces/auth.interface";
import { IUser } from "@interfaces/user.interface";
import { verify } from "jsonwebtoken";

export const findUserFromToken = async (token: string) => {
    try {
        const decoded = verify(token, JWT_SECRET) as DataStoredInToken;
        const user = await findUserByAuth(decoded._id, token);
        if (!user) {
            throw new Error("Invalid token");
        }
        return user as IUser;
    } catch (error) {
        return null
    }
};


export const socketAuth = async (socket, next) => {
    const token = socket.handshake.query.token;
    socket.user = await findUserFromToken(token);
    return next();
};