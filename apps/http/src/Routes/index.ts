import { Router } from "express";
import SpaceRouter from "./space";
import UserRouter from "./user";
import AdminRouter from "../admin";
import db from "@repo/db/client";

const router = Router();

router.post("/signup", (req, res) => {
  res.json({
    message: "Signup successful",
  });
});

router.post("/signin", (req, res) => {
  res.json({
    message: "signin successful",
  });
});

router.get("/avatars", (req, res) => {
  res.json({
    message: "avatars",
  });
});

router.post("/space", (req, res) => {
  res.json({
    message: "space",
  });
});


router.get("/element", (req, res) => {
    res.json({
        message: "element",
    });
});


router.use("/admin", AdminRouter);
router.use("/user", UserRouter);
router.use("/space", SpaceRouter);



export default router;
