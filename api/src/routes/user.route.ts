import { Router } from "express";
import { auth, create, getAll, getById } from "@controllers/user.controller";
import { validateAccessToken, validateBody } from "@middleware/validate";
import { createUserSchema, loginUserSchema } from "@dto/user.schema";
import { createUserType, loginUserType } from "@interfaces/user.interface";

const userRouter = Router();

userRouter.get("/", getAll);

userRouter.post("/", validateBody<createUserType>(createUserSchema), create);
userRouter.post("/auth", validateBody<loginUserType>(loginUserSchema), auth);
userRouter.put("/update", validateAccessToken, getById);

// // // Delete one user
// userRouter.delete("/delete/:id", validate([]), User.delete);

export default userRouter;
