import { Router } from "express";
import { userMiddleware } from "../../middleware/user";
import { UserController } from "../../controllers/user.controller";

export const userRouter = Router();

userRouter.post("/metadata", userMiddleware, UserController.updateMetadata);
userRouter.get("/metadata/bulk", UserController.getBulkMetadata);