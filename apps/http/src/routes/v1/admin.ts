import { Router } from "express";
import { adminMiddleware } from "../../middleware/admin";
import { AdminController } from "../../controllers/admin.controller";

export const adminRouter = Router();
adminRouter.use(adminMiddleware)

adminRouter.post("/element", AdminController.createElement);
adminRouter.put("/element/:elementId", AdminController.updateElement);
adminRouter.post("/avatar", AdminController.createAvatar);
adminRouter.post("/map", AdminController.createMap);