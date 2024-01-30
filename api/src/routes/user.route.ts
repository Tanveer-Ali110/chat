import { Router } from "express";
import { auth, create, getAll, getProfile } from "@controllers/user.controller";
import { validateAccessToken, validateBody } from "@middleware/validate";
import { createUserSchema, loginUserSchema } from "@dto/user.schema";
import { createUserType, loginUserType } from "@interfaces/user.interface";

const userRouter = Router();

userRouter.get("/", getAll);
userRouter.post("/", validateBody<createUserType>(createUserSchema), create);
userRouter.post("/auth", validateBody<loginUserType>(loginUserSchema), auth);
userRouter.get("/profile", validateAccessToken, getProfile);
// userRouter.delete("/delete/:id", validate([]), User.delete);

export default userRouter;
