import { Router } from "express";
import { userMiddleware } from "../../middleware/user";
import { SpaceController } from "../../controllers/space.controller";

export const spaceRouter = Router();

spaceRouter.post("/", userMiddleware, SpaceController.createSpace);
spaceRouter.delete("/element", userMiddleware, SpaceController.deleteElement);
spaceRouter.delete("/:spaceId", userMiddleware, SpaceController.deleteSpace);
spaceRouter.get("/all", userMiddleware, SpaceController.getAllSpaces);
spaceRouter.post("/element", userMiddleware, SpaceController.addElement);
spaceRouter.get("/:spaceId", SpaceController.getSpace);