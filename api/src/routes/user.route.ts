import { Router } from "express";
import { create, getAll } from "@controllers/user.controller";
import { validateBody } from "@middleware/validate";
import { createUserSchema } from "@dto/user.schema";
import { createUserType } from "@interfaces/user.interface";

const userRouter = Router();

userRouter.get("/", getAll);

userRouter.post("/", validateBody<createUserType>(createUserSchema), create);

// // Update one user
// body = ["age"]
// userRouter.put("/update", validate([]), User.update);

// // // Delete one user
// userRouter.delete("/delete/:id", validate([]), User.delete);

export default userRouter;
