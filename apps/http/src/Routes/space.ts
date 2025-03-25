import { Router } from "express";

const SpaceRouter = Router();

SpaceRouter.delete("/:spaceid", (req, res) => {
  res.json({
    message: "delete space",
  });
});

SpaceRouter.get("/all", (req, res) => {
  res.json({
    message: "all spaces",
  });
});

SpaceRouter.get("/:spaceid", (req, res) => {
    res.json({
      message: "get space",
    });
  });

SpaceRouter.post("/element", (req, res) => {
    res.json({
      message: "create element",
    });
  });   

SpaceRouter.delete("/element", (req, res) => {
    res.json({
      message: "delete element",
    });
  });



export default SpaceRouter;


