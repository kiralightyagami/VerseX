import { Router } from "express";

const AdminRouter = Router();

AdminRouter.post("/element", (req, res) => {
    res.json({
        message: "create element",
    });
});

AdminRouter.put("/element/:elementid", (req, res) => {
    res.json({
        message: "update element",
    });
});

AdminRouter.post("/avatar", (req, res) => {
    res.json({
        message: "create avatar",
    });
});


AdminRouter.post("/map", (req, res) => {
    res.json({
        message: "create map",
    });
});


export default AdminRouter;
