
import { SECRET } from "@config/environment";
import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

export const encryptPassword = async function (this: any, next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await hash(user.password, 8);
    }
    next();
}

export async function generateAccessToken(this: any,
  expiresIn: string = "30d",
  isLogin = true
) {
  const user = this;
  const token = sign({ _id: user._id.toString() }, "jwtscret", { expiresIn });
  if (isLogin) {
      user.accessTokens.push(token);
      await user.save();
  }
  return token;
};