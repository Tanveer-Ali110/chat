import { Router } from "express";
import { create, getAll } from "@controllers/user.controller";
// import { validate } from "@middleware/validate";

const userRouter = Router();

userRouter.get("/", getAll);

// // Add one user
// body = ["name", "age"]
userRouter.post("/", create);

// // Update one user
// body = ["age"]
// userRouter.put("/update", validate([]), User.update);

// // // Delete one user
// userRouter.delete("/delete/:id", validate([]), User.delete);

export default userRouter;
