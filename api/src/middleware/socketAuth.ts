import { JWT_SECRET } from "@config/environment";
import { findUserByAuth } from "@entity/user/service";
import { DataStoredInToken } from "@interfaces/auth.interface";
import { IUser } from "@interfaces/user.interface";
import { verify } from "jsonwebtoken";

export const findUserFromToken = async (token: string) => {
    try {
        const decoded = verify(token, JWT_SECRET) as DataStoredInToken;
        console.log('decoded', decoded)
        const user = await findUserByAuth(decoded._id, token);
        console.log("user", user)
        if (!user) {
            throw new Error("Invalid token");
        }
        return user as IUser;
    } catch (error) {
        return null
    }
};


export const socketAuth = async (socket, next) => {
    const token = socket.handshake.auth.token;
    console.log('token', token)
    if (token) {
        socket.user = await findUserFromToken(token);
        return next();
    }
    return next(new Error('Authentication failed'));
};