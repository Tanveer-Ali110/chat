import { createUserSchema, loginUserSchema } from "@dto/user.schema";
import { Model } from "mongoose";
import { z } from "zod";

export interface IUser {
    name: string;
    email: string;
    password: string;
    contact_no?: number | undefined;
    accessTokens?: string[];
    generateAccessToken(expiresIn?: string, isLogin?: boolean): string;
}
export interface IUserModel extends Model<IUser> {
    findByCredentials(email: string, password: string): IUser;
}

export type createUserType = z.infer<typeof createUserSchema>;
export type loginUserType = z.infer<typeof loginUserSchema>;