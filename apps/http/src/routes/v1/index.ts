import { Router } from "express";
import { userRouter } from "./user";
import { spaceRouter } from "./space";
import { adminRouter } from "./admin";
import { AuthController } from "../../controllers/auth.controller";
import { ResourceController } from "../../controllers/resource.controller";

export const router = Router();

router.post("/signup", AuthController.signup);
router.post("/signin", AuthController.signin);

router.get("/elements", ResourceController.getElements);
router.get("/avatars", ResourceController.getAvatars);

router.use("/user", userRouter)
router.use("/space", spaceRouter)
router.use("/admin", adminRouter)