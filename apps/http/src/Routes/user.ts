import { Router } from "express";

const UserRouter = Router();

UserRouter.post("/metadata", (req, res) => {
  res.json({
    message: "metadata",
  });
});

UserRouter.post("/metadata/bulk?ids", (req, res) => {
  res.json({
    message: "bulk metadata",
  });
});



export default UserRouter;
